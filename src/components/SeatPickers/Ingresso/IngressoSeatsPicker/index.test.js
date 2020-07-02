import React from 'react';
import { render } from '@testing-library/react';

// eslint-disable-next-line no-unused-vars
import { toBeEmpty } from '@testing-library/jest-dom';
import IngressoSeatsPicker from './index';
import { ErrorReportingProvider } from '../../../ContextProviders/ErrorReportingProvider';

test('check that feather is being attached to the dom', async () => {
  const { getByTestId } = render(
    <ErrorReportingProvider>
      <IngressoSeatsPicker
        eventData={{ eventID: '7AB', perfID: '7AB-7' }}
        handleSeatAdded={() => {}}
        handleSeatRemoved={() => {}}
      />
    </ErrorReportingProvider>
  );

  expect(getByTestId('loading-spinner')).not.toBeEmpty();

  // await waitFor(() => expect(getByTestId('ingresso-widget')).not.toBeEmpty(), {
  //   timeout: 3000,
  // });
}, 4000);
