import { userOrdersSlice, getUserOrders } from './userOrders';

const initialState = {
  orders: [],
  isLoading: true
};

const orders = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945'
    ],
    _id: '6752109fe367de001daf72bf',
    status: 'done',
    name: 'EXAMPLE_NAME',
    createdAt: '2024-12-05T20:44:15.281Z',
    updatedAt: '2024-12-05T20:44:16.136Z',
    number: 61705
  }
];

describe('userOrdersSlice', () => {
  describe('getUserOrders', () => {
    test('expect isLoading is true if pending', () => {
      const state = userOrdersSlice.reducer(
        initialState,
        getUserOrders.pending('pending')
      );

      expect(state.isLoading).toBe(true);
    });

    test('expect data is filled if fulfilled', () => {
      const state = userOrdersSlice.reducer(
        initialState,
        getUserOrders.fulfilled(orders, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(orders);
    });

    test('expect isLoading is false if rejected', () => {
      const errorMessage = 'error';
      const state = userOrdersSlice.reducer(
        initialState,
        getUserOrders.rejected(new Error(errorMessage), 'rejected')
      );

      expect(state.isLoading).toBe(false);
    });
  });
});
