import moment from 'moment';
import { getExtraDataFromDate } from './index';

test('getExtraDataFromDate', () => {
  const entries = [
    {
      eventDate: moment(new Date(2018, 11, 24, 10, 33, 30, 0)),
      eventExtraData: { someVal: 1 },
    },
    {
      eventDate: moment(new Date(2019, 11, 24, 10, 33, 30, 0)),
      eventExtraData: { someVal: 2 },
    },
    {
      eventDate: moment(new Date()),
      eventExtraData: { someVal: 3 },
    },
  ];

  expect(getExtraDataFromDate(moment(new Date()), entries).someVal).toBe(3);
});
