export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST"
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE"

export const FETCH_POST_DETAIL_REQUEST = "FETCH_POST_DETAIL_REQUEST"
export const FETCH_POST_DETAIL_SUCCESS = "FETCH_POST_DETAIL_SUCCESS"
export const FETCH_POST_DETAIL_FAILURE = "FETCH_POST_DETAIL_FAILURE"

export const CLEAR_CURRENT_POST = "CLEAR_CURRENT_POST"

import type { Post, PostWithUser } from "@/types"

export interface FetchPostsRequestAction {
  type: typeof FETCH_POSTS_REQUEST
}

export interface FetchPostsSuccessAction {
  type: typeof FETCH_POSTS_SUCCESS
  payload: Post[]
}

export interface FetchPostsFailureAction {
  type: typeof FETCH_POSTS_FAILURE
  payload: string
}

export interface FetchPostDetailRequestAction {
  type: typeof FETCH_POST_DETAIL_REQUEST
  payload: number
}

export interface FetchPostDetailSuccessAction {
  type: typeof FETCH_POST_DETAIL_SUCCESS
  payload: PostWithUser
}

export interface FetchPostDetailFailureAction {
  type: typeof FETCH_POST_DETAIL_FAILURE
  payload: string
}

export interface ClearCurrentPostAction {
  type: typeof CLEAR_CURRENT_POST
}

export type PostsActionTypes =
  | FetchPostsRequestAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction
  | FetchPostDetailRequestAction
  | FetchPostDetailSuccessAction
  | FetchPostDetailFailureAction
  | ClearCurrentPostAction

// Action Creators
export const fetchPostsRequest = (): FetchPostsRequestAction => ({
  type: FETCH_POSTS_REQUEST,
})

export const fetchPostsSuccess = (posts: Post[]): FetchPostsSuccessAction => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
})

export const fetchPostsFailure = (error: string): FetchPostsFailureAction => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
})

export const fetchPostDetailRequest = (id: number): FetchPostDetailRequestAction => ({
  type: FETCH_POST_DETAIL_REQUEST,
  payload: id,
})

export const fetchPostDetailSuccess = (post: PostWithUser): FetchPostDetailSuccessAction => ({
  type: FETCH_POST_DETAIL_SUCCESS,
  payload: post,
})

export const fetchPostDetailFailure = (error: string): FetchPostDetailFailureAction => ({
  type: FETCH_POST_DETAIL_FAILURE,
  payload: error,
})

export const clearCurrentPost = (): ClearCurrentPostAction => ({
  type: CLEAR_CURRENT_POST,
})
