import { AuthActionType, All } from './auth.actions';

export interface State {
  accessToken: string | null;

  errorLoginMessage: string | null;

  errorRegisterMessage: string | null;
}

export const initialState: State = {
  accessToken: null,
  errorLoginMessage: null,
  errorRegisterMessage: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionType.LOGIN_SUCCESS: {
      return {
        ...state,
        accessToken: action.accessToken.token,
        errorLoginMessage: null,
      };
    }
    case AuthActionType.LOGIN_FAILURE: {
      return {
        ...state,
        errorLoginMessage: action.error.message,
      };
    }
    case AuthActionType.REGISTER_SUCCESS: {
      return {
        ...state,
        errorRegisterMessage: null,
      };
    }
    case AuthActionType.REGISTER_FAILURE: {
      return {
        ...state,
        errorRegisterMessage: action.error.message,
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
