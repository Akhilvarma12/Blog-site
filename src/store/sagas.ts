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
    const posts: Post[] = yield call([apiService, "getPosts"])
    yield put(fetchPostsSuccess(posts))
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch posts"
    yield put(fetchPostsFailure(message))
  }
}

function* fetchPostDetailSaga(action: FetchPostDetailAction) {
  try {
    const post: Post = yield call([apiService, "getPost"], action.payload)
    const user: User = yield call([apiService, "getUser"], post.userId)

    const postWithUser: PostWithUser = {
      ...post,
      user,
    }

    yield put(fetchPostDetailSuccess(postWithUser))
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
