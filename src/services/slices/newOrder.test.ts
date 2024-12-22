import { newOrderSlice, placeNewOrder } from './newOrder';

const initialState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

const order = {
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
};

describe('newOrderSlice', () => {
  describe('placeNewOrder', () => {
    test('expect orderRequest is true if pending', () => {
      const state = newOrderSlice.reducer(
        initialState,
        placeNewOrder.pending('pending', [])
      );

      expect(state.orderRequest).toBe(true);
    });

    test('expect modalData is filled if fulfilled', () => {
      const state = newOrderSlice.reducer(
        initialState,
        placeNewOrder.fulfilled(
          { order, success: true, name: '' },
          'fulfilled',
          []
        )
      );

      expect(state.orderModalData).toBe(order);
      expect(state.error).toBe(undefined);
    });

    test('expect error is filled if rejected', () => {
      const errorMessage = 'error';
      const state = newOrderSlice.reducer(
        initialState,
        placeNewOrder.rejected(new Error(errorMessage), 'rejected', [])
      );

      expect(state.error).toEqual(errorMessage);
    });
  });
});
