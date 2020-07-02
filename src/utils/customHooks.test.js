import { renderHook } from '@testing-library/react-hooks';
import { useCurrencyMultiplier } from './customHooks';

test('test currecyMultiplier hook', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useCurrencyMultiplier('USD', 'GBP')
  );

  expect(result.current).toBe(null);

  await waitForNextUpdate();

  expect(result.current).not.toBe(null);
  expect(result.current).toBeTruthy();
  expect(typeof result.current).toBe('number');
});
