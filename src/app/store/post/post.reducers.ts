import { PostActionType, All } from './post.actions';
import { Post } from '../../models/post';

export interface State {
  posts: Post[];
  errorMessage: string | null;
}

export const initialState: State = {
  posts: [],
  errorMessage: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case PostActionType.PUBLISH_SUCCESS: {
      return {
        ...state,
      };
    }
    case PostActionType.PUBLISH_FAILURE: {
      return {
        ...state,
        errorMessage: 'An error occurs',
      };
    }
    case PostActionType.DISPLAY_SUCCESS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    case PostActionType.DISPLAY_FAILURE: {
      return {
        ...state,
        errorMessage: 'An error occurs',
      };
    }
    default: {
      return state;
    }
  }
}
