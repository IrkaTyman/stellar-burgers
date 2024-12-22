import {
  addItem,
  deleteItem,
  clearAll,
  updateAll,
  constructorSlice,
  TConstructorState
} from './constructor';

const initialState = {
  bun: null,
  ingredients: []
};

const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const ingredientFirst = {
  calories: 4242,
  carbohydrates: 242,
  fat: 142,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  name: 'Биокотлета из марсианской Магнолии',
  price: 424,
  proteins: 420,
  type: 'main',
  __v: 0,
  _id: '643d69a5c3f7b9001cfa0941'
};

const ingredientSecond = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

describe('constructorSlice', () => {
  describe('addItem', () => {
    test('expect bun in state', () => {
      const state = constructorSlice.reducer(initialState, addItem(bun));
      expect(state.bun).toEqual(bun);
      expect(state.ingredients).toHaveLength(0);
    });

    test('expect ingredient in state', () => {
      const state = constructorSlice.reducer(
        initialState,
        addItem(ingredientFirst)
      );
      expect(state.bun).toBe(null);
      expect(state.ingredients).toEqual([ingredientFirst]);
    });
  });

  describe('deleteItem', () => {
    test('expect ingredients is empty', () => {
      const state = constructorSlice.reducer(
        {
          ...initialState,
          ingredients: [ingredientFirst]
        },
        deleteItem(ingredientFirst)
      );
      expect(state.ingredients).toEqual([]);
    });
  });

  describe('updateAll', () => {
    test('expect ingredients is swap', () => {
      const state = constructorSlice.reducer(
        {
          ...initialState,
          ingredients: [ingredientFirst, ingredientSecond]
        },
        updateAll([ingredientSecond, ingredientFirst])
      );
      expect(state.ingredients).toEqual([ingredientSecond, ingredientFirst]);
    });
  });

  describe('clearAll', () => {
    test('expect ingredients is swap', () => {
      const state = constructorSlice.reducer(
        {
          ...initialState,
          ingredients: [ingredientFirst, ingredientSecond]
        },
        clearAll()
      );
      expect(state).toEqual(initialState);
    });
  });
});
