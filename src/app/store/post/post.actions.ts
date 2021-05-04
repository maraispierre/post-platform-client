import { Action } from '@ngrx/store';
import { Post } from '../../models/post';

export enum PostActionType {
  PUBLISH = '[POST] Publish',
  PUBLISH_SUCCESS = '[POST] Publish Success',
  PUBLISH_FAILURE = '[POST] Publish Failure',
  DISPLAY = '[POST] Display',
  DISPLAY_SUCCESS = '[POST] Display Success',
  DISPLAY_FAILURE = '[POST] Display Failure',
}

export class PublishAction implements Action {
  readonly type = PostActionType.PUBLISH;
  constructor(public readonly post: Post) {}
}

export class PublishSuccessAction implements Action {
  readonly type = PostActionType.PUBLISH_SUCCESS;
  constructor(public readonly post: Post) {}
}

export class PublishFailureAction implements Action {
  readonly type = PostActionType.PUBLISH_FAILURE;
  constructor(public readonly error: Error) {}
}

export class DisplayAction implements Action {
  readonly type = PostActionType.DISPLAY;
  constructor() {}
}

export class DisplaySuccessAction implements Action {
  readonly type = PostActionType.DISPLAY_SUCCESS;
  constructor(public readonly posts: Post[]) {}
}

export class DisplayFailureAction implements Action {
  readonly type = PostActionType.DISPLAY_FAILURE;
  constructor(public error: Error) {}
}

export type All =
  | PublishAction
  | PublishSuccessAction
  | PublishFailureAction
  | DisplayAction
  | DisplaySuccessAction
  | DisplayFailureAction;
