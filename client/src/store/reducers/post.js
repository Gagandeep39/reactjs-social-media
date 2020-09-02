import * as actionType from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.GET_POST:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case actionType.POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionType.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case actionType.UPDATE_LIKES:
      return {
        ...state,
        /**
         * Posts array has multiple post with each one associated with Likes
         * Below logic updates the likes only fr that post that has been updated instead of all posts
         */
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    default:
      return state;
  }
};
