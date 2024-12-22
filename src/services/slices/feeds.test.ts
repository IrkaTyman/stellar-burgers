import { feedsSlice, getAllFeeds } from './feeds';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: undefined
};

const feedsValue = {
  orders: [],
  total: 1,
  totalToday: 1,
  success: true
};

describe('feedsSlice', () => {
  describe('getAllFeeds', () => {
    test('expect isLoading is true if pending', () => {
      const state = feedsSlice.reducer(
        initialState,
        getAllFeeds.pending('pending')
      );

      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(undefined);
    });

    test('expect data is filled if fulfilled', () => {
      const state = feedsSlice.reducer(
        initialState,
        getAllFeeds.fulfilled(feedsValue, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(undefined);
      expect(state.orders).toEqual(feedsValue.orders);
      expect(state.total).toEqual(feedsValue.total);
      expect(state.totalToday).toEqual(feedsValue.totalToday);
    });

    test('expect error is filled if rejected', () => {
      const errorMessage = 'error';
      const state = feedsSlice.reducer(
        initialState,
        getAllFeeds.rejected(new Error(errorMessage), 'rejected')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(errorMessage);
    });
  });
});
