import {
  removeNullValsFromObject,
  compareDateWithCurrentUTC,
  uuid,
} from './index';

test('test helper removeNullValsFromObject()', () => {
  const formattedObj = removeNullValsFromObject({
    1: 'hey',
    test: 1,
    arr: 0,
    eyy: null,
  });

  expect(formattedObj).toEqual({
    1: 'hey',
    test: 1,
    arr: 0,
  });
});

test('test helper compareDateWithCurrentUTC()', () => {
  // equal
  const result = compareDateWithCurrentUTC(new Date());
  expect(result).toBe(0);

  // positive
  const t = new Date();
  t.setSeconds(t.getSeconds() + 10);

  const result2 = compareDateWithCurrentUTC(t);
  expect(result2).toBe(10);

  // negative
  const x = new Date();
  x.setSeconds(x.getSeconds() - 10);

  const result3 = compareDateWithCurrentUTC(x);
  expect(result3).toBe(-9);
});

test('test helper uuid(), check if any duplicates are generated', () => {
  const uuids = [];
  for (let i = 0; i < 100; i++) {
    uuids.push(uuid());
  }

  const isArrayUnique = arr =>
    Array.isArray(arr) && new Set(arr).size === arr.length; // add function to check that array is unique.

  expect(isArrayUnique(uuids)).toBeTruthy();
});
