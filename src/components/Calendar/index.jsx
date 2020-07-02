import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import moment from 'moment';
import { Row, Select, Calendar as AntdCalendar } from 'antd';
import get from 'lodash.get';
import classNames from 'classnames';
import Icon from '../Icon';
import { ThemeContext } from '../ContextProviders/ThemeProvider';

export function getExtraDataFromDate(date, availableEntries) {
  const selectedEntry = availableEntries.find(
    entry =>
      moment(entry.eventDate).format('DD-MM-YYYY') === date.format('DD-MM-YYYY')
  );

  return get(selectedEntry, 'eventExtraData', null);
}

export default function Calendar({
  defaultDate,
  availableEntries = [],
  onSelection,
  isRangePickMode,
}) {
  // TODO check for duplicate date and throw a warning if there are any
  const theme = useContext(ThemeContext);
  const [fromSelectedDate, setFromSelectedDate] = useState(
    defaultDate != null
      ? defaultDate
      : get(availableEntries, '[0].eventDate', null)
      ? moment(availableEntries[0].eventDate)
      : null
  );

  const [toSelectedDate, setToSelectedDate] = useState(null);

  function handleDateSelection(cellDate) {
    const extraData = getExtraDataFromDate(cellDate, availableEntries);

    if (!isRangePickMode) {
      onSelection(cellDate, extraData);
    } else if (isRangePickMode) {
      if (fromSelectedDate == null) {
        setFromSelectedDate(cellDate);
        return null;
      }
      if (cellDate.diff(fromSelectedDate, 'days') < 0) {
        setFromSelectedDate(cellDate);
        if (fromSelectedDate != null && toSelectedDate != null) {
          onSelection([cellDate, toSelectedDate]);
        }
        return null;
      }
      if (
        fromSelectedDate != null &&
        toSelectedDate != null &&
        cellDate.diff(toSelectedDate, 'days') < 0 &&
        cellDate.diff(fromSelectedDate, 'days') > 0
      ) {
        const cellDiffFromDate = Math.abs(
          cellDate.diff(fromSelectedDate, 'days')
        );
        const cellDiffToDate = Math.abs(cellDate.diff(toSelectedDate, 'days'));

        if (cellDiffFromDate < cellDiffToDate) {
          setFromSelectedDate(cellDate);
          onSelection([cellDate, toSelectedDate]);
        } else {
          setToSelectedDate(cellDate);
          onSelection([fromSelectedDate, cellDate]);
        }
        return null;
      }
      onSelection([fromSelectedDate, cellDate]);
      setToSelectedDate(cellDate);
    }
    return null;
  }

  return (
    <div className="calendar">
      <AntdCalendar
        fullscreen={false}
        className="calendar__body"
        defaultValue={moment(
          fromSelectedDate != null ? fromSelectedDate : new Date()
        )}
        dateFullCellRender={cellDate => {
          const cellClass = classNames({
            'ant-picker-cell-inner': true,
            'calendar-cell__from-date':
              isRangePickMode && cellDate.diff(fromSelectedDate, 'days') === 0,
            'calendar-cell__to-date':
              isRangePickMode && cellDate.diff(toSelectedDate, 'days') === 0,
            'calendar-cell__range-part':
              isRangePickMode &&
              cellDate.diff(toSelectedDate, 'days') < 0 &&
              cellDate.diff(fromSelectedDate, 'days') > 0,
          });

          return (
            <div
              className={cellClass}
              role="button"
              tabIndex="0"
              onKeyDown={() => handleDateSelection(cellDate)}
              onClick={() => handleDateSelection(cellDate)}
            >
              <div className="ant-picker-calendar-date-value">
                {cellDate.format('D')}
              </div>
            </div>
          );
        }}
        disabledDate={date => {
          // this slows down performance
          if (availableEntries.length === 0 || isRangePickMode) {
            // all entries are valid if you do not pass anything in
            return false;
          }

          const elemDate = moment(date);
          const isAvailableEntry = availableEntries.some(elem => {
            const momentDate = moment(elem.eventDate);
            return elemDate.isSame(momentDate, 'day');
          });
          return !isAvailableEntry;
        }}
        headerRender={({ value, onChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          const current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.months(current));
          }

          for (let index = start; index < end; index++) {
            monthOptions.push(
              <Select.Option className="month-item" key={`${index}`}>
                {months[index]}
              </Select.Option>
            );
          }
          const month = value.month();

          const year = value.year();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div className="ant-picker-header calendar__header">
              <button
                type="button"
                tabIndex="-1"
                className="calendar__header__prev-btn"
                onClick={() => {
                  const newVal = value.clone().add(-1, 'months');
                  onChange(newVal);
                }}
              >
                <Icon id="leftAngle" color={theme['primary-color']} />
                {/* <span className="ant-picker-prev-icon" /> */}
              </button>
              <Row>
                <Select
                  value={String(month)}
                  onChange={selectedMonth => {
                    const newValue = value.clone();
                    newValue.month(parseInt(selectedMonth, 10));
                    onChange(newValue);
                  }}
                  className="calendar__header__month"
                  dropdownStyle={{ display: 'none' }}
                >
                  {monthOptions}
                </Select>
                <Select
                  className="calendar__header__year"
                  onChange={newYear => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                  value={String(year)}
                  dropdownStyle={{ display: 'none', cursor: 'text' }}
                >
                  {options}
                </Select>
              </Row>
              <button
                type="button"
                tabIndex="-1"
                className="calendar__header__next-btn "
                onClick={() => {
                  const newVal = value.clone().add(1, 'months');
                  onChange(newVal);
                }}
              >
                <Icon id="rightAngle" color={theme['primary-color']} />
                {/* <span className="ant-picker-next-icon" /> */}
              </button>
            </div>
          );
        }}
      />
    </div>
  );
}

Calendar.defaultProps = {
  onSelection: () => {},
  availableEntries: [],
  isRangePickMode: false,
  defaultDate: null,
};

Calendar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  defaultDate: PropTypes.object, // moment object
  availableEntries: PropTypes.arrayOf(
    PropTypes.shape({
      eventDate: PropTypes.string.isRequired,
      eventExtraData: PropTypes.any,
    })
  ),
  onSelection: PropTypes.func,
  isRangePickMode: PropTypes.bool,
};
