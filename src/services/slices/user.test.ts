import {
  login,
  logout,
  apiGetUser,
  userSlice,
  updateUser,
  register
} from './user';

const initialState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

const token = {
  refreshToken: 'a',
  accessToken: 'b'
};

const userData = {
  email: 'example@example.mail',
  name: 'Example'
};

const loginData = {
  email: 'example@example.mail',
  password: 'Example'
};

const registerData = {
  email: 'example@example.mail',
  name: 'Example',
  password: 'Example'
};

describe('userSlice', () => {
  describe('register', () => {
    test('expect error is empty if pending', () => {
      const state = userSlice.reducer(
        initialState,
        register.pending('pending', registerData)
      );
      expect(state.error).toBe('');
    });

    test('expect isAuth is true and user is filled if fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        register.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          registerData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    test('expect error is filled if rejected', () => {
      const errorMessage = 'error';
      const state = userSlice.reducer(
        initialState,
        register.rejected(new Error(errorMessage), 'rejected', registerData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });

  describe('login', () => {
    test('expect error is empty if pending', () => {
      const state = userSlice.reducer(
        initialState,
        login.pending('pending', loginData)
      );
      expect(state.error).toBe('');
    });

    test('expect isAuth is true and user is filled if fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        login.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          loginData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    test('expect error is filled if rejected', () => {
      const errorMessage = 'error';
      const state = userSlice.reducer(
        initialState,
        login.rejected(new Error(errorMessage), 'rejected', loginData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });

  describe('logout', () => {
    test('Сбрасывает состояние аутентификации при успешном выходе', () => {
      const state = userSlice.reducer(
        initialState,
        logout.fulfilled(undefined, 'fulfilled')
      );
      expect(state.isAuthChecked).toBe(false);
      expect(state.user).toEqual(initialState.user);
    });
  });

  describe('apiGetUser', () => {
    test('expect isAuth is true and user is filled if fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        apiGetUser.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled'
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    test('expect error is filled if rejected', () => {
      const errorMessage = 'error';
      const state = userSlice.reducer(
        initialState,
        apiGetUser.rejected(new Error(errorMessage), 'rejected')
      );
      expect(state.error).toEqual(errorMessage);
    });
  });

  describe('updateUser', () => {
    test('expect error is empty if pending', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.pending('pending', registerData)
      );
      expect(state.error).toBe('');
    });

    test('expect isAuth is true and user is filled if fulfilled', () => {
      const state = userSlice.reducer(
        initialState,
        updateUser.fulfilled(
          { user: userData, success: true, ...token },
          'fulfilled',
          registerData
        )
      );
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('');
      expect(state.user).toEqual(userData);
    });

    test('expect error is filled if rejected', () => {
      const errorMessage = 'error';
      const state = userSlice.reducer(
        initialState,
        updateUser.rejected(new Error(errorMessage), 'rejected', registerData)
      );
      expect(state.error).toEqual(errorMessage);
    });
  });
});
