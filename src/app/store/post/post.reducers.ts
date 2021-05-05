import { PostActionType, All } from './post.actions';
import { Post } from '../../models/post';

export interface State {
  posts: Post[];
  page: number;
  cursor: number | null;
}

export const initialState: State = {
  posts: [],
  page: 0,
  cursor: null,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case PostActionType.PUBLISH_SUCCESS: {
      return {
        ...state,
        page: 0,
        posts: [],
      };
    }
    case PostActionType.PUBLISH_FAILURE: {
      return {
        ...state,
      };
    }
    case PostActionType.DISPLAY_SUCCESS: {
      const statePosts = state.posts.concat(action.posts);
      return {
        ...state,
        posts: statePosts,
        page: state.page + 1,
        cursor: statePosts.length > 0 ? statePosts[0].id : null,
      };
    }
    case PostActionType.DISPLAY_FAILURE: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
