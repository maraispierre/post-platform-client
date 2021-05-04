import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectPostState } from '../../store/app.states';
import { LogoutAction } from '../../store/auth/auth.actions';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { DisplayAction, PublishAction } from '../../store/post/post.actions';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-home-page',
  templateUrl: './account-home-page.component.html',
  styleUrls: ['./account-home-page.component.scss'],
})
export class AccountHomePageComponent implements OnInit {
  getState: Observable<any>;
  errorMessage: string | null;
  newPostContent: FormControl;
  posts: Post[];

  constructor(private readonly store: Store<AppState>) {
    this.getState = store.select(selectPostState);
    this.errorMessage = null;
    this.newPostContent = new FormControl('', [Validators.required]);
    this.posts = [];
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.posts = state.posts;
    });

    this.store.dispatch(new DisplayAction());
  }

  publish(): void {
    if (this.newPostContent.valid) {
      this.store.dispatch(
        new PublishAction(new Post(this.newPostContent.value))
      );
    }
  }

  logout(): void {
    this.store.dispatch(new LogoutAction());
  }
}
