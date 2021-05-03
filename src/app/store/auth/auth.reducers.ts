import { AuthActionType, All } from './auth.actions';

export interface State {
  isAuthenticated: boolean;

  accessToken: string | null;

  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  accessToken: null,
  errorMessage: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionType.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.accessToken.token,
        errorMessage: null,
      };
    }
    case AuthActionType.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: action.error.message,
      };
    }
    case AuthActionType.REGISTER_SUCCESS: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    case AuthActionType.REGISTER_FAILURE: {
      return {
        ...state,
        errorMessage: action.error.message,
      };
    }
    case AuthActionType.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
