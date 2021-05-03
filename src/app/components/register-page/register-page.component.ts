import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { RegisterAction } from '../../store/auth/auth.actions';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  confirmPassword = new FormControl('', [
    Validators.required,
    () => {
      if (
        this.confirmPassword !== undefined &&
        this.password !== undefined &&
        this.confirmPassword.value !== this.password.value
      ) {
        return { mismatched: true };
      }
      return null;
    },
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

  getErrorConfirmPassword(): string {
    if (this.confirmPassword.hasError('required')) {
      return 'Confirm password is required';
    }
    if (this.confirmPassword.hasError('mismatched')) {
      return 'Passwords are not the same';
    }
    return '';
  }

  isFormValid(): boolean {
    return this.email.valid && this.password.valid;
  }

  register(): void {
    this.store.dispatch(
      new RegisterAction(new Credentials(this.email.value, this.password.value))
    );
  }
}
