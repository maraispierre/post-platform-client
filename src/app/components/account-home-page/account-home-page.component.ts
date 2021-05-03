import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { LogoutAction } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-account-home-page',
  templateUrl: './account-home-page.component.html',
  styleUrls: ['./account-home-page.component.scss'],
})
export class AccountHomePageComponent implements OnInit {
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(new LogoutAction());
  }
}
