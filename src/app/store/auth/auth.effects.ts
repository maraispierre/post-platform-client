import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  AuthActionType,
  LoginAction,
  LoginSuccessAction,
  LoginFailureAction,
  RegisterAction,
  RegisterSuccessAction,
  RegisterFailureAction,
} from './auth.actions';
import { of } from 'rxjs';
import { AccessToken } from '../../models/access-token';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions: Actions,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  // @ts-ignore
  Login = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActionType.LOGIN),
      exhaustMap((action: LoginAction) =>
        this.authService.login(action.credentials).pipe(
          map((accessToken: AccessToken) => {
            return new LoginSuccessAction(accessToken);
          }),
          catchError((error: Error) => {
            return of(new LoginFailureAction(error));
          })
        )
      )
    );
  });

  // @ts-ignore
  LoginSuccess = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActionType.LOGIN_SUCCESS),
        tap((action: LoginSuccessAction) => {
          localStorage.setItem('accessToken', action.accessToken.token);
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  // @ts-ignore
  LoginFailure = createEffect(
    () => {
      return this.actions.pipe(ofType(AuthActionType.LOGIN_FAILURE));
    },
    { dispatch: false }
  );

  // @ts-ignore
  Register = createEffect(() => {
    return this.actions.pipe(
      ofType(AuthActionType.REGISTER),
      exhaustMap((action: RegisterAction) =>
        this.authService.register(action.credentials).pipe(
          map(
            (accessToken: AccessToken) => new RegisterSuccessAction(accessToken)
          ),
          catchError((error: Error) => of(new RegisterFailureAction(error)))
        )
      )
    );
  });

  // @ts-ignore
  RegisterSuccess = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActionType.REGISTER_SUCCESS),
        tap((action: RegisterSuccessAction) => {
          localStorage.setItem('accessToken', action.accessToken.token);
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  // @ts-ignore
  RegisterFailure = createEffect(
    () => {
      return this.actions.pipe(ofType(AuthActionType.REGISTER_FAILURE));
    },
    { dispatch: false }
  );

  // @ts-ignore
  Logout = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AuthActionType.LOGOUT),
        tap(() => {
          localStorage.removeItem('accessToken');
          this.router.navigateByUrl('/login');
        })
      );
    },
    { dispatch: false }
  );
}
