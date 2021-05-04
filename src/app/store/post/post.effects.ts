import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  PostActionType,
  PublishAction,
  PublishSuccessAction,
  PublishFailureAction,
  DisplayAction,
  DisplaySuccessAction,
  DisplayFailureAction,
} from './post.actions';
import { of } from 'rxjs';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Injectable()
export class PostEffects {
  constructor(
    private readonly actions: Actions,
    private readonly postService: PostService
  ) {}

  // @ts-ignore
  Publish = createEffect(() => {
    return this.actions.pipe(
      ofType(PostActionType.PUBLISH),
      exhaustMap((action: PublishAction) =>
        this.postService.publish(action.post).pipe(
          map((post: Post) => {
            console.log('effect Publish');
            return new PublishSuccessAction(post);
          }),
          catchError((error: Error) => {
            return of(new PublishFailureAction(error));
          })
        )
      )
    );
  });

  // @ts-ignore
  PublishSuccess = createEffect(() => {
    return this.actions.pipe(
      ofType(PostActionType.PUBLISH_SUCCESS),
      map(() => {
        return new DisplayAction();
      })
    );
  });

  // @ts-ignore
  PublishFailure = createEffect(
    () => {
      return this.actions.pipe(ofType(PostActionType.PUBLISH_FAILURE));
    },
    { dispatch: false }
  );

  // @ts-ignore
  Display = createEffect(() => {
    return this.actions.pipe(
      ofType(PostActionType.DISPLAY),
      exhaustMap(() =>
        this.postService.display().pipe(
          map((posts: Post[]) => new DisplaySuccessAction(posts)),
          catchError((error: Error) => of(new DisplayFailureAction(error)))
        )
      )
    );
  });

  // @ts-ignore
  DisplaySuccess = createEffect(
    () => {
      return this.actions.pipe(ofType(PostActionType.DISPLAY_SUCCESS));
    },
    { dispatch: false }
  );

  // @ts-ignore
  DisplayFailure = createEffect(
    () => {
      return this.actions.pipe(ofType(PostActionType.DISPLAY_FAILURE));
    },
    { dispatch: false }
  );
}
