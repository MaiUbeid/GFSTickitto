/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import 'isomorphic-fetch';
import es6Promise from 'es6-promise';
import { getURLParameters } from './index';

es6Promise.polyfill(); // ie11 polyfill

class ApiClient {
  constructor() {
    this.urlParameters = getURLParameters();
  }

  reusableFetcher(success = () => {}, fail = () => {}, fetchArgs) {
    const { url } = fetchArgs;
    fetch(url, fetchArgs)
      .then(async res => {
        if (res.ok) {
          const data = await res.json();
          success(data);
          return;
        }
        const errData = await res.text();
        fail(errData);
      })
      .catch(e => {
        console.error(fetchArgs[0], ' err:', e);
        fail(e);
      });
  }

  searchForEvents(eventData, success, fail) {
    if (eventData === null) {
      console.error('searchForEvent Error: Unprocessable Entity');
      fail('The event requested is not available');
      return;
    }

    const newData = {};
    if (eventData && eventData !== null) {
      Object.entries(eventData).forEach(([key, value]) => {
        if (value !== null) {
          newData[key] = value;
        }
      });
    }

    this.reusableFetcher(success, fail, {
      url: `/tkt/api/events/`,
      method: 'POST',
      body: JSON.stringify({
        t1: newData.t1,
        t2: newData.t2,
        categories: newData.categories,
        city: newData.city,
        country: newData.country,
        country_code: newData.country_code,
      }),
      headers: {
        key: process.env.REACT_APP_TIK_API_KEY,
      },
    });
  }

  getEventById(eventId, success, fail) {
    if (eventId === null) {
      console.error('getEvent Error: The event requested is not available');
      fail('The event requested is not available');
      return;
    }

    this.reusableFetcher(success, fail, {
      url: `/tkt/api/events/${eventId}`,
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_TIK_API_KEY,
      },
    });
  }

  getAvailability(data, success, fail) {
    if (
      !(
        Object.keys(data).includes('basketId') &&
        Object.keys(data).includes('eventId')
      )
    ) {
      console.error('necessary data not passed');
      fail('necessary data not present');
    }

    this.reusableFetcher(success, fail, {
      url: `/tkt/api/availability/?event_id=${data.eventId}&basket_id=${data.basketId}`,
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_TIK_API_KEY,
      },
    });
  }

  getSessionAvailability(sessionId, success, fail) {
    // const successMiddleware = data => {
    //   const newData = data;
    //   // adds the basket id locally if we don't have one there already
    //   if (
    //     data.basket_id != null &&
    //     sessionStorage.getItem('basketId') == null
    //   ) {
    //     sessionStorage.setItem('basketId', data.basket_id);
    //   }
    //   newData.basket_id = sessionStorage.getItem('basketId'); // return the data with the locally stored basketId
    //   success(newData);
    // };

    this.reusableFetcher(success, fail, {
      url: `/tkt/api/availability/session?session_id=${sessionId}`,
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_TIK_API_KEY,
      },
    });
  }

  getBasketContents(success, fail) {
    const basketId = sessionStorage.getItem('basketId');
    if (basketId == null) {
      console.error('No basketId in session storage');
      fail('No basketId in session storage');
      return;
    }

    this.reusableFetcher(success, fail, {
      url: `/tkt/api/basket/?basket_id=${basketId}`,
      method: 'GET',
      headers: {
        key: process.env.REACT_APP_TIK_API_KEY,
      },
    });
  }

  // id and tickets can be an array or a single value, but make sure they are both the same
  addToBasket(sessionId, id, ticketsData, success = () => {}, fail = () => {}) {
    const basketId = sessionStorage.getItem('basketId');

    let arraydId = id;
    let arraydTicketData = ticketsData;
    if (!Array.isArray(id)) {
      arraydId = [id];
    }
    if (!Array.isArray(ticketsData)) {
      arraydTicketData = [ticketsData];
    }
    const queryPromises = [];
    // we need to do a call per ticket passed to it
    Object.keys(arraydTicketData).forEach((ticketKey, index) => {
      const ticket = arraydTicketData[ticketKey];
      const ticketid = arraydId[index]; // ticket.performance_id; // ingresso ID
      const promise = new Promise((resolve, reject) => {
        this.reusableFetcher(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          },
          {
            url: `/tkt/api/basket/add?basket_id=${basketId}&availability_session_id=${sessionId}`,
            method: 'POST',
            body: JSON.stringify({
              id: ticketid,
              booking_options: {
                ...ticket,
              },
            }),
            headers: {
              key: process.env.REACT_APP_TIK_API_KEY,
            },
          }
        );
      });

      queryPromises.push(promise);
    });

    Promise.all(queryPromises) // return result when all queries are finished
      .then(data => {
        success(data[data.length - 1]); // just return the last one since it will contain the newest up to date entry
      })
      .catch(err => {
        fail(err);
      });
  }

  removeFromBasket(itemId, success, fail) {
    const basketId = sessionStorage.getItem('basketId');

    this.reusableFetcher(success, fail, {
      url: `/tkt/api/basket/remove?item_id=${itemId}&basket_id=${basketId}`,
      method: 'POST',
      headers: {
        key: process.env.REACT_APP_TIK_API_KEY,
      },
    });
  }

  // this is never used by the widget, its used to create the basketId
  getBasketId(success, fail) {
    const storedVal = sessionStorage.getItem('basketId');
    if (storedVal !== null) {
      success({ _id: storedVal });
      return null;
    }

    const successMiddleware = data => {
      sessionStorage.setItem('basketId', data._id);
      success(data);
    };

    this.reusableFetcher(successMiddleware, fail, {
      url: `/tkt/api/basket`,
      method: 'POST',
      headers: {
        key: process.env.REACT_APP_TIK_API_KEY,
      },
    });
  }

  getIngressoPerformanceAvailability(perfId, success, fail) {
    this.reusableFetcher(success, fail, {
      url: `/f13/availability.v1?perf_id=${perfId}`,
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${process.env.REACT_APP_INGRESSO_API_CRED}`,
      }),
      redirect: 'follow',
    });
  }

  getIngressoToken(success = () => {}, fail = () => {}) {
    fetch('/api/b2b', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${process.env.REACT_APP_INGRESSO_API_CRED}`,
      }),
      redirect: 'follow',
    })
      .then(async res => {
        if (res.ok) {
          // eslint-disable-next-line no-restricted-syntax
          for (const pair of res.headers.entries()) {
            if (pair[0] === 'x-b2b-token') {
              success({ token: pair[1] });
              return null;
            }
          }
          fail({ message: 'request was fine but no token recieved' });
          return null;
        }
        const errData = await res.json();
        console.error('not ok:', errData);
        fail(errData);
      })
      .catch(e => {
        console.error('ingresso api token err:', e);
        fail(e);
      });
  }
}
export default new ApiClient();
