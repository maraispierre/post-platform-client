import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginAction } from '../../store/auth/auth.actions';
import { Credentials } from '../../models/credentials';
import { AppState, selectAuthState } from '../../store/app.states';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;
  hidePassword: boolean;

  constructor(
    private readonly store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.getState = store.select(selectAuthState);
    this.errorMessage = null;
    this.hidePassword = true;
    this.form = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorLoginMessage;
    });
  }

  getErrorEmail(): string {
    if (this.form.get('email')?.hasError('required')) {
      return 'Email is required';
    }

    if (this.form.get('email')?.hasError('email')) {
      return 'Email is not valid';
    }
    return '';
  }

  getErrorPassword(): string {
    if (this.form.get('password')?.hasError('required')) {
      return 'Password is required';
    }

    if (this.form.get('password')?.hasError('minlength')) {
      return 'Password is too short. Minimum 8 characters';
    }
    return '';
  }
  login(): void {
    if (this.form.valid) {
      this.store.dispatch(
        new LoginAction(
          new Credentials(
            this.form.get('email')?.value,
            this.form.get('password')?.value
          )
        )
      );
    }
  }
}
