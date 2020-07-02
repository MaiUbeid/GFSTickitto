import moment from 'moment';
import {
  groupPrioAvailibilitySlotsByDay,
  reformatPrioCalendarEntries,
} from './index';

const prioTestData = [
  {
    availability_active: true,
    availability_capacity_id: '7394',
    availability_created: '2020-03-23T00:50:57+00:00',
    availability_from_date_time: '2020-05-08T10:00:00+02:00',
    availability_id: '20200508094510007394',
    availability_modified: '2020-03-23T00:50:57+00:00',
    availability_product_id: '2879',
    availability_spots: {
      availability_spots_total: 50,
      availability_spots_reserved: 0,
      availability_spots_booked: 0,
      availability_spots_open: 50,
    },
    availability_to_date_time: '2020-05-08T10:00:00+02:00',
  },
  {
    availability_active: true,
    availability_capacity_id: '7394',
    availability_created: '2020-03-23T00:50:57+00:00',
    availability_from_date_time: '2020-05-08T11:00:00+02:00',
    availability_id: '20200508104511007394',
    availability_modified: '2020-03-23T00:50:57+00:00',
    availability_product_id: '2879',
    availability_spots: {
      availability_spots_total: 50,
      availability_spots_reserved: 0,
      availability_spots_booked: 0,
      availability_spots_open: 50,
    },
    availability_to_date_time: '2020-05-08T11:00:00+02:00',
  },
  {
    availability_active: true,
    availability_capacity_id: '7394',
    availability_created: '2020-03-23T00:50:57+00:00',
    availability_from_date_time: '2020-05-09T15:00:00+02:00',
    availability_id: '20200509144515007394',
    availability_modified: '2020-03-23T00:50:57+00:00',
    availability_product_id: '2879',
    availability_spots: {
      availability_spots_total: 50,
      availability_spots_reserved: 0,
      availability_spots_booked: 0,
      availability_spots_open: 50,
    },
    availability_to_date_time: '2020-05-09T15:00:00+02:00',
  },
];

test('test groupPrioAvailibilitySlotsByDay()', () => {
  const result = groupPrioAvailibilitySlotsByDay(prioTestData);

  expect(Object.keys(result).length).toBe(2);
  expect(result[Object.keys(result)[0]].length).toBe(2);

  expect(Object.keys(result)[0]).toBe(
    moment(prioTestData[0].availability_from_date_time)
      .startOf('day')
      .toISOString()
  );
});

test('test reformatPrioCalendarEntries()', () => {
  const groupedData = groupPrioAvailibilitySlotsByDay(prioTestData);
  const result = reformatPrioCalendarEntries(groupedData);

  expect(result[0].eventDate).toBe(Object.keys(groupedData)[0]);
  expect(result[1].eventDate).toBe(Object.keys(groupedData)[1]);
});
