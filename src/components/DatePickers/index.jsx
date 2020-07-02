/* eslint-disable no-unused-vars */
// eslint-disable-next-line jsx-a11y/no-static-element-interactions
/* eslint-disable jsx-a11y/interactive-supports-focus */
// eslint-disable-next-line jsx-a11y/interactive-supports-focus
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, DatePicker } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';
import 'moment/locale/en-gb';
import moment from 'moment';

import Icon from '../Icon';
import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { AppViewContext } from '../ContextProviders/AppViewProvider';
import { EventsContext } from '../ContextProviders/EventsProvider';

import MobileBottomModal from '../MobileBottomModal';
import Calendar from '../Calendar';
import Button from '../Button';

import './style.scss';

const { RangePicker } = DatePicker;

moment.updateLocale('en-gb', {
  weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
});

export default function DatePickers({ className, onSelection, defaultDates }) {
  const theme = useContext(ThemeContext);
  const { isTablet } = useContext(AppViewContext);
  const [{ events }, setParameters] = useContext(EventsContext);

  const [isCalendarShown, toggleShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState(null);

  useEffect(() => {
    onSelection(selectedDates);
  }, [selectedDates]);

  return (
    <div>
      <div
        role="button"
        className="input__container"
        onKeyDown={() => {
          toggleShowCalendar(true);
        }}
        onClick={() => {
          toggleShowCalendar(true);
        }}
      >
        <ConfigProvider locale={enGB}>
          <RangePicker
            onKeyDown={() => {
              toggleShowCalendar(true);
            }}
            onClick={() => {
              toggleShowCalendar(true);
            }}
            allowEmpty
            allowClear={false}
            placeholder={['From', 'Until']}
            format="DD MMM"
            suffixIcon={<Icon id="calendar" color={theme['primary-color']} />}
            separator={
              !isTablet &&
              isCalendarShown && (
                <>
                  <div className="main__calendar">
                    <Calendar
                      isRangePickMode
                      onSelection={dates => {
                        setSelectedDates(dates);
                        setParameters({
                          t1: dates[0].format('YYYY-MM-DD'),
                          t2: dates[1].format('YYYY-MM-DD'),
                        });
                      }}
                    />
                  </div>
                  <div
                    className="calendar__background"
                    label="calendar"
                    role="button"
                    onClick={e => {
                      if (e.target.className === 'calendar__background') {
                        e.stopPropagation();
                        toggleShowCalendar(false);
                      }
                    }}
                    onKeyDown={e => {
                      if (e.target.className === 'calendar__background') {
                        e.stopPropagation();
                        toggleShowCalendar(false);
                      }
                    }}
                  />
                </>
              )
            }
            className={className}
            dropdownClassName={`${className}-dropdown`}
            data-testid="datePickerTest"
            onChange={value => {
              setSelectedDates(value);
            }}
            inputReadOnly
            value={selectedDates || defaultDates}
          />
        </ConfigProvider>
      </div>

      {(!isTablet || isCalendarShown) && (
        <MobileBottomModal modalCloseCalled={() => toggleShowCalendar(false)}>
          <div className="result__calendar">
            <Calendar
              isRangePickMode
              onSelection={dates => {
                setSelectedDates(dates);
              }}
            />
            <Button
              text="Select dates"
              buttonType="primary"
              buttonStyle="result__calendar-button"
              isWithArrow
              handleOnClick={() => {
                toggleShowCalendar(false);
              }}
            />
          </div>
        </MobileBottomModal>
      )}
    </div>
  );
}

DatePickers.defaultProps = {
  className: '',
  onSelection: () => {},
  defaultDates: null,
};

DatePickers.propTypes = {
  defaultDates: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  onSelection: PropTypes.func,
};
