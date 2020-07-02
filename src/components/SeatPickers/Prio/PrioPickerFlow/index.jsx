import React, { useState, useContext, useMemo } from 'react';
import moment from 'moment';
import get from 'lodash.get';
import './style.scss';
import { ApiAvailibilityContext } from '../../../ContextProviders/ApiAvailabilityProvider';
import PrioStaticPicker from '../PrioStaticPicker';
import PerformancePick from '../../Common/PerformancePick';
import WidgetHeader from '../../Common/WidgetHeader';
import { getSelectedPerfomanceData } from './utils';
import { entryTypes } from '../../../../constants/apiConfig';
import { uuid } from '../../../../utils/index';

export const flowStates = {
  INTERACTIVE: 'interactive-seating',
  STATIC: 'static-seating',
  CALENDAR: 'calendar-stage',
};

/*
  groups all of the availibility slots by day,
  returns something like:
  {
    somedate: [
      {slotdata},
      {slotdata}
    ]
    somedate: [
      {slotdata},
      {slotdata}
    ]
  }
*/
export const groupAvailibilitySlotsByDay = (
  availabilityArr = [],
  nameOfDateFieldToGroupBy
) => {
  const groupedData = {};
  for (let i = 0; i < availabilityArr.length; i++) {
    const slot = availabilityArr[i];

    const formattedDate = moment(slot[nameOfDateFieldToGroupBy])
      .startOf('day')
      .toISOString();

    if (groupedData[formattedDate] == null) {
      groupedData[formattedDate] = [slot];
    } else {
      groupedData[formattedDate].push(slot);
    }
  }

  return groupedData;
};

export const reformatPrioCalendarEntries = groupedAvailability => {
  return Object.keys(groupedAvailability).map(date => {
    return {
      eventDate: date,
      eventExtraData: groupedAvailability[date],
    };
  });
};

// TODO add tests
export const getConcessionsForDate = (selectedDate, concessionsArr) => {
  if (concessionsArr == null || concessionsArr.length === 0) {
    return null;
  }

  // if we have only 1 season skip searching for the correct one and just return the only one we have
  if (concessionsArr.length === 1) {
    return concessionsArr[0].product_type_season_details;
  }

  const mDate = moment(selectedDate);
  const concessionForDate = concessionsArr.find(concession => {
    const consessionFrom = moment(concession.product_type_season_start_date);
    const concessionTo = moment(concession.product_type_season_end_date);

    return mDate.isAfter(consessionFrom) && mDate.isBefore(concessionTo);
  });

  if (concessionForDate || concessionForDate.length === 0) {
    console.error(
      'error: getConcessionsForDate could not find concessions for the date picked, likely error with the api'
    );
  }

  return concessionForDate.product_type_season_details;
};

// TODO reformat this compionent using react router when we have designs
export default function PrioPickerFlow() {
  const sessionAvailbility = useContext(ApiAvailibilityContext);

  const [flowState, setFlowStage] = useState({
    prevStage: flowStates.CALENDAR,
    stage: flowStates.CALENDAR,
    selectedDay: null,
    selectedPerformanceId: null,
  });

  const groupedEntryData = useMemo(
    () =>
      groupAvailibilitySlotsByDay(
        sessionAvailbility.availability,
        'availability_from_date_time'
      ),
    [sessionAvailbility.availability]
  );

  const reformattedEntryData = reformatPrioCalendarEntries(groupedEntryData);
  let content = null;
  if (flowState.stage === flowStates.CALENDAR) {
    content = (
      <PerformancePick
        key={uuid()}
        availableEntries={reformattedEntryData}
        isNoSlotPick={sessionAvailbility.admission_type === entryTypes.DATE}
        onSelection={data => {
          setFlowStage({
            ...flowState,
            stage: flowStates.STATIC,
            selectedPerformanceId: data.availability_id,
          });
        }}
        slotDisplayNameBuilder={(slot, format) => {
          if (sessionAvailbility.admission_type === 'timed_entry') {
            return moment(slot.availability_from_date_time).format(format);
          }
          if (sessionAvailbility.admission_type === 'slot_entry') {
            return `${moment(slot.availability_from_date_time).format(
              format
            )} - ${moment(slot.availability_to_date_time).format(format)}`;
          }

          if (sessionAvailbility.admission_type === 'date_entry') {
            return moment(slot.availability_from_date_time).format(format);
          }

          return moment().format(format);
        }}
      />
    );
  } else if (
    flowState.stage === flowStates.STATIC &&
    flowState.selectedPerformanceId !== null
  ) {
    // gets the data for that particular performance
    const selectedPerfAvailability = getSelectedPerfomanceData(
      sessionAvailbility,
      flowState.selectedPerformanceId
    );

    const openSeatsNumber = get(
      selectedPerfAvailability,
      'availability_spots.availability_spots_open',
      null
    );
    // get the concessions stuff
    let formattedConcessions = [];
    const concessionsSeasons = get(
      sessionAvailbility,
      'event_definition.product_type_seasons',
      null
    );
    if (concessionsSeasons != null) {
      // get the concessions for that selected day
      const concessions = getConcessionsForDate(
        selectedPerfAvailability.availability_from_date_time,
        concessionsSeasons
      ); // selectionState.selectedPerformanceId
      formattedConcessions = concessions.map(concession => ({
        id: concession.product_type_id,
        name: concession.product_type_label,
        price: concession.product_type_pricing.product_type_list_price,
      }));
    }

    // if we have no concessions just let people pick the number of tickets
    if (formattedConcessions.length === 0) {
      formattedConcessions.push({
        id: selectedPerfAvailability.availability_product_id,
        name: 'Select number of tickets',
        price: sessionAvailbility.from_price,
      });
    }
    content = (
      <PrioStaticPicker
        perfId={flowState.selectedPerformanceId}
        ticketsAvailableNum={openSeatsNumber}
        concessionTypes={formattedConcessions}
      />
    );
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

PrioPickerFlow.propTypes = {};
