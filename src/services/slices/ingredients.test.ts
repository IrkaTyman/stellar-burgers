import { ingredientsSlice, getIngredientsList } from './ingredients';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const ingredients = [
  {
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
  }
];

describe('ingredientsSlice', () => {
  describe('getIngredientsList', () => {
    test('expect isLoading is true if pending', () => {
      const state = ingredientsSlice.reducer(
        initialState,
        getIngredientsList.pending('pending')
      );

      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    test('expect data is filled if fulfilled', () => {
      const state = ingredientsSlice.reducer(
        initialState,
        getIngredientsList.fulfilled(ingredients, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.ingredients).toEqual(ingredients);
    });

    test('expect error is filled if rejected', () => {
      const errorMessage = 'error';
      const state = ingredientsSlice.reducer(
        initialState,
        getIngredientsList.rejected(new Error(errorMessage), 'rejected')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(errorMessage);
    });
  });
});
