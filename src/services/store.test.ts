import store from './store';

describe('store', () => {
  test('expect state is equal initialState if dispatch UNKNOWN_ACTION', () => {
    const initialState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: undefined });
    const newState = store.getState();

    expect(newState).toEqual(initialState);
  });
});
