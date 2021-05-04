import { Action } from '@ngrx/store';
import { Credentials } from '../../models/credentials';
import { AccessToken } from '../../models/access-token';

export enum AuthActionType {
  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[AUTH] Login Success',
  LOGIN_FAILURE = '[AUTH] Login Failure',
  REGISTER = '[AUTH] Register',
  REGISTER_SUCCESS = '[AUTH] Register Success',
  REGISTER_FAILURE = '[AUTH] Register Failure',
  LOGOUT = '[AUTH] Logout',
  GET_STATUS = '[AUTH] GetStatus',
}

export class LoginAction implements Action {
  readonly type = AuthActionType.LOGIN;
  constructor(public readonly credentials: Credentials) {}
}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionType.LOGIN_SUCCESS;
  constructor(public readonly accessToken: AccessToken) {}
}

export class LoginFailureAction implements Action {
  readonly type = AuthActionType.LOGIN_FAILURE;
  constructor(public readonly error: Error) {}
}

export class RegisterAction implements Action {
  readonly type = AuthActionType.REGISTER;
  constructor(public readonly credentials: Credentials) {}
}

export class RegisterSuccessAction implements Action {
  readonly type = AuthActionType.REGISTER_SUCCESS;
  constructor(public readonly accessToken: AccessToken) {}
}

export class RegisterFailureAction implements Action {
  readonly type = AuthActionType.REGISTER_FAILURE;
  constructor(public error: Error) {}
}

export class LogoutAction implements Action {
  readonly type = AuthActionType.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthActionType.GET_STATUS;
}

export type All =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LogoutAction
  | GetStatus;
