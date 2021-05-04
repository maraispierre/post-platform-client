import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { RegisterAction } from '../../store/auth/auth.actions';
import { Credentials } from '../../models/credentials';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;
  hidePassword: boolean;
  hideConfirmPassword: boolean;
  matcher = new ConfirmPasswordErrorStateMatcher();

  constructor(
    private readonly store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.getState = store.select(selectAuthState);
    this.errorMessage = null;
    this.hidePassword = true;
    this.hideConfirmPassword = true;
    this.form = formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(''),
      },
      {
        validators: this.passwordValidator.bind(this),
      }
    );
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorRegisterMessage;
    });
  }

  passwordValidator(formGroup: FormGroup): null | any {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    return passwordControl?.value === confirmPasswordControl?.value
      ? null
      : { mismatched: true };
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

  getErrorConfirmPassword(): string {
    if (this.form.hasError('mismatched')) {
      return 'Passwords are not the same';
    }
    return 'null';
  }

  register(): void {
    if (this.form.valid) {
      this.store.dispatch(
        new RegisterAction(
          new Credentials(
            this.form.get('email')?.value,
            this.form.get('password')?.value
          )
        )
      );
    }
  }
}

class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(
      control?.parent?.invalid &&
      control?.parent?.dirty &&
      control?.parent?.hasError('mismatched')
    );

    return invalidCtrl || invalidParent;
  }
}
