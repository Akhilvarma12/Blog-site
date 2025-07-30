import { call, put, takeEvery, all } from "redux-saga/effects"
import apiService from "@/src/services/api"
import type { Post, User, PostWithUser, FetchPostDetailAction } from "@/src/types"
import {
  FETCH_POSTS_REQUEST,
  FETCH_POST_DETAIL_REQUEST,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostDetailSuccess,
  fetchPostDetailFailure,
} from "./actions"

function* fetchPostsSaga() {
  try {
    const cachedPosts = localStorage.getItem("posts")

    if (cachedPosts) {
      const posts: Post[] = JSON.parse(cachedPosts)
      yield put(fetchPostsSuccess(posts))
    } else {
      const posts: Post[] = yield call([apiService, "getPosts"])
      localStorage.setItem("posts", JSON.stringify(posts))
      yield put(fetchPostsSuccess(posts))
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch posts"
    yield put(fetchPostsFailure(message))
  }
}

function* fetchPostDetailSaga(action: FetchPostDetailAction) {
  try {
    const postId = action.payload
    const cachedData = localStorage.getItem(`post-${postId}`)

    if (cachedData) {
      const postWithUser: PostWithUser = JSON.parse(cachedData)
      yield put(fetchPostDetailSuccess(postWithUser))
    } else {
      const post: Post = yield call([apiService, "getPost"], postId)
      const user: User = yield call([apiService, "getUser"], post.userId)

      const postWithUser: PostWithUser = {
        ...post,
        user,
      }

      localStorage.setItem(`post-${postId}`, JSON.stringify(postWithUser))
      yield put(fetchPostDetailSuccess(postWithUser))
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch post details"
    yield put(fetchPostDetailFailure(message))
  }
}


function* watchFetchPosts() {
  yield takeEvery(FETCH_POSTS_REQUEST, fetchPostsSaga)
}

function* watchFetchPostDetail() {
  yield takeEvery(FETCH_POST_DETAIL_REQUEST, fetchPostDetailSaga)
}

export function* rootSaga() {
  yield all([watchFetchPosts(), watchFetchPostDetail()])
}
