import React, { useState, useContext } from 'react';
import './style.scss';
import { ApiAvailibilityContext } from '../../../ContextProviders/ApiAvailabilityProvider';
import PerformancePick from '../../Common/PerformancePick';
import IngressoSeatsPicker from '../IngressoSeatsPicker';
import IngressoStaticPicker from '../IngressoStaticPicker';
import WidgetHeader from '../../Common/WidgetHeader';
import { uuid } from '../../../../utils/index';

import {
  groupAvailibilitySlotsByDay,
  reformatPrioCalendarEntries,
  flowStates,
} from '../../Prio/PrioPickerFlow';

// TODO reformat this component using react router when we have designs
export default function IngressoPickerFlow() {
  const sessionAvailbility = useContext(ApiAvailibilityContext);
  const [flowState, setFlowStage] = useState({
    prevStage: flowStates.CALENDAR,
    stage: flowStates.CALENDAR,
    selectedPerformanceId: null,
  });

  const groupedAvailability = groupAvailibilitySlotsByDay(
    sessionAvailbility.performances,
    'performance_date'
  );

  const reformattedEntryData = reformatPrioCalendarEntries(groupedAvailability);

  const useFeather = sessionAvailbility.seatplan_source === 'feather';

  let content = null;
  if (sessionAvailbility.needs_performance === true) {
    if (flowState.stage === flowStates.CALENDAR) {
      content = (
        <PerformancePick
          key={uuid()} // forces a refresh of its state on rerender of this compoennt used for calendar
          availableEntries={reformattedEntryData}
          onSelection={selectedSlot => {
            setFlowStage({
              ...flowState,
              prevStage: flowState.stage,
              stage: useFeather ? flowStates.INTERACTIVE : flowStates.STATIC,
              selectedPerformanceId: selectedSlot.performance_id,
            });
          }}
        />
      );
    } else if (flowState.stage === flowStates.INTERACTIVE) {
      content = (
        <IngressoSeatsPicker
          eventData={{
            eventID: sessionAvailbility.supplier_product_id,
            perfID: flowState.selectedPerformanceId,
          }}
          handleError={e => {
            console.warn(
              'Dynamic Seating plan failed, show static seating picker',
              e
            );
            setFlowStage({
              ...flowState,
              prevStage: flowState.stage,
              stage: flowStates.STATIC,
            });
          }}
        />
      );
    } else if (flowState.stage === flowStates.STATIC) {
      content = (
        <IngressoStaticPicker perfId={flowState.selectedPerformanceId} />
      );
    }
  }

  return (
    <>
      <WidgetHeader
        onGoBack={() => {
          setFlowStage({ ...flowState, stage: flowState.prevStage });
        }}
      />
      {content}
    </>
  );
}

IngressoPickerFlow.propTypes = {};
