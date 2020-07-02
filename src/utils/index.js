import moment from 'moment';

// remove values that have nulls in an object
export function removeNullValsFromObject(obj) {
  const cleanObj = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null) {
      cleanObj[key] = obj[key];
    }
  });

  return cleanObj;
}

// get some url parameters from the current iframe url
export function getURLParameters() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const paramsObj = {};
  paramsObj.session = params.get('session_id');
  paramsObj.theme = params.get('theme');
  paramsObj.locale = params.get('locale');
  paramsObj.currency = params.get('currency');
  paramsObj.checkTTL = params.get('check_ttl');
  paramsObj.referrer = params.get('referrer');
  paramsObj.eventId = params.get('event_id');
  paramsObj.fromDate = params.get('from_date');
  paramsObj.toDate = params.get('to_date');
  paramsObj.category = params.get('category');
  paramsObj.city = params.get('city');
  paramsObj.country = params.get('country');
  paramsObj.country_code = params.get('country_code');
  // remove null vals
  return removeNullValsFromObject(paramsObj);
}

// compare a UTC date string to the current UTC time
export function compareDateWithCurrentUTC(dateString) {
  const now = new Date();
  const currentUTCTime = moment.utc(now.toUTCString());
  const dateToCompare = moment.utc(dateString); // .diff(new Date) //compare to right now

  return dateToCompare.diff(currentUTCTime, 'seconds'); // compare to right now
}

// create uuid
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise, eqeqeq
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// localizes how the price should be displayed
export function makePriceString(price, currency = 'GBP', locale = 'en-GB') {
  const internatinalizedFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(price);

  return internatinalizedFormat;
}

export function dispatchPostMessage(type, messageData = {}) {
  const messageTypes = {
    NEW_HEIGHT: 'NEW_HEIGHT',
    INITIALIZED: 'INITIALIZED',
    NEW_TICKET_PICKED: 'NEW_TICKET_PICKED',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
  };

  const referrer = getURLParameters().referrer || '*';

  if (!Object.keys(messageTypes).includes(type)) {
    throw new Error('Invalid post message type provided');
  }

  window.parent.postMessage({ type, messageData }, referrer);
}
