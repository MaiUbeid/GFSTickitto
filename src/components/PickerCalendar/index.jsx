/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Calendar } from 'antd';
import moment from 'moment';

export default function PickerCalendar({ availableEntries = [], onSelection }) {
  const [selectedDate, setSelectedDate] = useState(
    availableEntries[0].eventDate || new Date()
  );
  // TODO CHECK IF some dates are on the same day and merge them
  // TODO fix bug with selecting a different month and it running onSelection

  return (
    <div className="picker-calendar">
      <Calendar
        value={moment(selectedDate)}
        onSelect={date => {
          setSelectedDate(date);
        }}
        dateCellRender={date => {
          const elemDate = moment(date);
          const isAvailableEntry = availableEntries.filter(elem => {
            const momentDate = moment(elem.eventDate);
            return elemDate.isSame(momentDate);
          });

          return isAvailableEntry.length > 0
            ? isAvailableEntry.map(entry => {
                // render multiple entries if we have them
                return (
                  <div
                    key={entry.eventDate}
                    className="picker-calendar__active-cell"
                    role="button"
                    onClick={() => {
                      onSelection(entry);
                    }}
                  >
                    {moment(entry.eventDate).format('HH:mm')}
                  </div>
                );
              })
            : null;
        }}
        disabledDate={date => {
          // this slows down performance
          const elemDate = moment(date);
          const isAvailableEntry = availableEntries.some(elem => {
            const momentDate = moment(elem.eventDate);
            return elemDate.isSame(momentDate);
          });
          return !isAvailableEntry;
        }}
      />
    </div>
  );
}

PickerCalendar.defaultProps = {
  onSelection: () => {},
};

PickerCalendar.propTypes = {
  availableEntries: PropTypes.arrayOf(
    PropTypes.shape({
      eventDate: PropTypes.string.isRequired,
      eventExtraData: PropTypes.object,
    })
  ).isRequired,
  onSelection: PropTypes.func,
};
