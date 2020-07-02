import React, { useState, useContext } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import Calendar, { getExtraDataFromDate } from '../../../Calendar';
import Button from '../../../Button';
import SlotSelect from '../SlotSelect';
import { AppViewContext } from '../../../ContextProviders/AppViewProvider';
import { TicketCommsControllerContext } from '../../../ContextProviders/TicketCommsController';

export default function PerformancePick({
  availableEntries,
  onSelection = () => {},
  slotDisplayNameBuilder,
  isNoSlotPick,
}) {
  const { selectedDate, onSelectedDate } = useContext(
    TicketCommsControllerContext
  );

  let rehydrationSelectedSlot = null;
  if (selectedDate != null) {
    rehydrationSelectedSlot = getExtraDataFromDate(
      selectedDate,
      availableEntries
    );
  }

  const { isTablet } = useContext(AppViewContext);
  const [slotPickOptions, setSlotPickOptions] = useState(
    rehydrationSelectedSlot || []
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const optionsRenderData = slotPickOptions.map(elem => {
    let displayName = null;
    if (slotDisplayNameBuilder != null) {
      displayName = slotDisplayNameBuilder(elem, 'HH:mm');
    } else if (elem.performance_date != null) {
      // not ideal, it should just pass slotDisplayNameBUilder for ingresso and then we can remove this
      displayName = moment(elem.performance_date).format('HH:mm');
    }

    return {
      displayName,
      data: elem,
    };
  });

  const isCaleShowing = (isTablet && slotPickOptions.length === 0) || !isTablet;
  const isSlotShowing = slotPickOptions.length !== 0;

  return (
    <div className="performance-pick">
      {isCaleShowing && (
        <Calendar
          defaultDate={selectedDate}
          availableEntries={availableEntries}
          onSelection={(date, extraData) => {
            onSelectedDate(date);
            if (isNoSlotPick) {
              onSelection(extraData[0]);
            }
            setSlotPickOptions(extraData);
          }}
        />
      )}

      {isSlotShowing && (
        <div className="performance-pick__slot-panel">
          <SlotSelect
            slots={optionsRenderData}
            handleSelection={selectedItem => {
              setSelectedSlot(selectedItem);
            }}
          />
          <Button
            buttonType="primary"
            text="Next"
            isWithArrow
            handleOnClick={() => {
              if (selectedSlot != null) {
                onSelection(selectedSlot);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

PerformancePick.defaultProps = {
  slotDisplayNameBuilder: null,
  isNoSlotPick: false,
};

PerformancePick.propTypes = {
  availableEntries: PropTypes.arrayOf(
    PropTypes.shape({
      eventDate: PropTypes.string.isRequired,
      eventExtraData: PropTypes.arrayOf(PropTypes.any).isRequired,
    })
  ).isRequired,
  onSelection: PropTypes.func.isRequired,
  slotDisplayNameBuilder: PropTypes.func,
  isNoSlotPick: PropTypes.bool, // if this is on we should only have one element in the eventExtraData
};
