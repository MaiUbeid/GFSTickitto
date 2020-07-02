import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {
  HomePage,
  ResultsPages,
  FormPage,
  EventPage,
  SeatsPickerPage,
  CardsPage,
  FAQsPage,
  ShoppingCartPage,
  EventTicketPick,
} from '../containers';
import { Footer } from '../components';
import { ErrorReportingProvider } from '../components/ContextProviders/ErrorReportingProvider';
import { ApiAvailabilityProvider } from '../components/ContextProviders/ApiAvailabilityProvider';
import { ThemeProvider } from '../components/ContextProviders/ThemeProvider';
import { SettingsProvider } from '../components/ContextProviders/SettingsProvider';
import { TicketsProvider } from '../components/ContextProviders/TicketsProvider';
import { AppViewProvider } from '../components/ContextProviders/AppViewProvider';
import { EventsProvider } from '../components/ContextProviders/EventsProvider';
import { PopupsProvider } from '../components/ContextProviders/PopupsProvider';

import './style.scss';

export default function App() {
  return (
    <div className="app">
      <ErrorReportingProvider>
        <AppViewProvider>
          <SettingsProvider>
            <PopupsProvider>
              <EventsProvider>
                <ThemeProvider>
                  <TicketsProvider>
                    <Router>
                      <Switch>
                        <Route
                          exact
                          path={ROUTES.HOME_PAGE}
                          render={props => <HomePage {...props} />}
                        />
                        <Route
                          exact
                          path={ROUTES.SEARCH_RESULTS}
                          render={porps => (
                            <ResultsPages type="search" {...porps} />
                          )}
                        />
                        <Route
                          exact
                          path={ROUTES.LOCATION_RESULTS}
                          render={porps => (
                            <ResultsPages type="location" {...porps} />
                          )}
                        />
                        <Route
                          exact
                          path={ROUTES.CATEGORY_RESULTS}
                          render={porps => (
                            <ResultsPages type="category" {...porps} />
                          )}
                        />
                        <Route
                          exact
                          path={ROUTES.FORM_PAGE}
                          render={props => <FormPage {...props} />}
                        />
                        <Route
                          exact
                          path={ROUTES.EVENT_PAGE}
                          render={props => {
                            return <EventPage {...props} />;
                          }}
                        />
                        <Route
                          exact
                          path={ROUTES.LOCATIONS_PAGE}
                          render={props => (
                            <CardsPage type="locations" {...props} />
                          )}
                        />
                        <Route
                          exact
                          path={ROUTES.CATEGORIES_PAGE}
                          render={props => (
                            <CardsPage type="categories" {...props} />
                          )}
                        />
                        <Route
                          exact
                          path={ROUTES.EVENT_TICKET_PICK_PAGE}
                          render={props => <EventTicketPick {...props} />}
                        />
                        <Route
                          exact
                          path={ROUTES.STANDALONE_PICKER}
                          render={props => {
                            return (
                              <ApiAvailabilityProvider>
                                <SeatsPickerPage {...props} />
                              </ApiAvailabilityProvider>
                            );
                          }}
                        />
                        <Route
                          exact
                          path={ROUTES.FAQ_PAGE}
                          render={props => <FAQsPage {...props} />}
                        />
                        <Route
                          exact
                          path={ROUTES.SHOPPING_CART_PAGE}
                          render={props => <ShoppingCartPage {...props} />}
                        />
                      </Switch>
                      <Footer />
                    </Router>
                  </TicketsProvider>
                </ThemeProvider>
              </EventsProvider>
            </PopupsProvider>
          </SettingsProvider>
        </AppViewProvider>
      </ErrorReportingProvider>
    </div>
  );
}
