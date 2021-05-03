import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActionType, LoginAction } from '../../store/auth/auth.actions';
import { Credentials } from '../../models/credentials';
import { AppState, selectAuthState } from '../../store/app.states';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private readonly store: Store<AppState>) {
    this.getState = store.select(selectAuthState);
    this.errorMessage = null;
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  getErrorEmail(): string {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    if (this.email.hasError('email')) {
      return 'Email is not valid';
    }
    return '';
  }

  getErrorPassword(): string {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }

    if (this.password.hasError('minlength')) {
      return 'Password is too short. Minimum 8 characters';
    }
    return '';
  }

  isFormValid(): boolean {
    return this.email.valid && this.password.valid;
  }

  login(): void {
    this.store.dispatch(
      new LoginAction(new Credentials(this.email.value, this.password.value))
    );
  }
}
