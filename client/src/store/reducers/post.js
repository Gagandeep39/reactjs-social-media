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
    case actionType.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case actionType.GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case actionType.ADD_POST:
      console.log(payload);
      return {
        ...state,
        posts: [payload, ...state.posts],
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
    case actionType.ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case actionType.REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
          loading: false,
        },
      };
    default:
      return state;
  }
};
