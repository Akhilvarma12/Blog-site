// API Types
import { Action } from "redux"

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface PostWithUser {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export interface PostWithUser extends Post {
  user?: User
}


// Redux State Types
export interface PostsState {
  posts: Post[]
  currentPost: PostWithUser | null
  loading: boolean
  error: string | null
}

export interface RootState {
  posts: PostsState
}

// Action Types
export interface FetchPostsAction extends Action<"FETCH_POSTS_REQUEST"> {}

export interface FetchPostsSuccessAction extends Action<"FETCH_POSTS_SUCCESS"> {
  payload: Post[]
}

export interface FetchPostsFailureAction extends Action<"FETCH_POSTS_FAILURE"> {
  payload: string
}

export interface FetchPostDetailAction extends Action<"FETCH_POST_DETAIL_REQUEST"> {
  payload: number
}

export interface FetchPostDetailSuccessAction extends Action<"FETCH_POST_DETAIL_SUCCESS"> {
  payload: PostWithUser
}

export interface FetchPostDetailFailureAction extends Action<"FETCH_POST_DETAIL_FAILURE"> {
  payload: string
}

export interface ClearCurrentPostAction extends Action<"CLEAR_CURRENT_POST"> {}

export type PostsActions =
  | FetchPostsAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction
  | FetchPostDetailAction
  | FetchPostDetailSuccessAction
  | FetchPostDetailFailureAction
  | ClearCurrentPostAction
