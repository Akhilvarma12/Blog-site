import type { PostsState } from "@/types"
import {
  type PostsActionTypes,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_DETAIL_REQUEST,
  FETCH_POST_DETAIL_SUCCESS,
  FETCH_POST_DETAIL_FAILURE,
  CLEAR_CURRENT_POST,
} from "../actions/postsActions"

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
}

export const postsReducer = (state = initialState, action: PostsActionTypes): PostsState => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      }
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case FETCH_POST_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_POST_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPost: action.payload,
        error: null,
      }
    case FETCH_POST_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        currentPost: null,
      }
    default:
      return state
  }
}
