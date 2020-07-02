import React from 'react';
import './style.scss';
import { Layout } from 'antd';
import moment from 'moment';
import TicketPickWidget from '../../components/SeatPickers/Widget';
import { ApiAvailabilityProvider } from '../../components/ContextProviders/ApiAvailabilityProvider';
import * as ROUTES from '../../constants/routes';
import { Header } from '../../components';
import { getURLParameters } from '../../utils';

export default function SeatsPickerPage() {
  const { sessionId, fromDate } = getURLParameters();

  return (
    <Layout className="faq-page">
      <Header
        bradcrumb
        type="results"
        subHeaderTitle="FAQs"
        headerStyle="faq-page__header"
        layer={false}
        popup
        breadCrumbLink={ROUTES.HOME_PAGE}
      />
      <div className="seats-picker-page">
        <ApiAvailabilityProvider sessionId={sessionId}>
          <TicketPickWidget selectedDate={moment(fromDate, 'YYYY-MM-DD')} />
        </ApiAvailabilityProvider>
      </div>
    </Layout>
  );
}
