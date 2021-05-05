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
  page: number;
  cursor: number | null;

  constructor(private readonly store: Store<AppState>) {
    this.getState = store.select(selectPostState);
    this.errorMessage = null;
    this.newPostContent = new FormControl('', [
      Validators.required,
      Validators.maxLength(80),
    ]);
    this.posts = [];
    this.page = 0;
    this.cursor = null;
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.posts = state.posts;
      this.page = state.page;
      this.cursor = state.cursor;
    });

    this.store.dispatch(new DisplayAction(this.page, this.cursor));
  }

  getPostContentError(): string {
    if (this.newPostContent.hasError('required')) {
      return 'Content is required';
    }

    if (this.newPostContent.hasError('maxlength')) {
      return 'Content does not exceed 80 characters';
    }

    return '';
  }

  publish(): void {
    if (this.newPostContent.valid) {
      this.store.dispatch(
        new PublishAction(new Post(this.newPostContent.value))
      );
      this.newPostContent.reset();
      this.newPostContent.setErrors(null);
    }
  }

  getUsername(email: string | undefined): string {
    if (email === undefined) {
      return '@';
    }
    return '@' + email.substring(0, email.indexOf('@'));
  }

  logout(): void {
    this.store.dispatch(new LogoutAction());
  }

  loadMore(): void {
    this.store.dispatch(new DisplayAction(this.page, this.cursor));
  }
}
