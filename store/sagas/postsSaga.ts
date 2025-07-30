import { call, put, takeLatest } from "redux-saga/effects"
import { apiService } from "@/utils/apiService"
import {
  FETCH_POSTS_REQUEST,
  FETCH_POST_DETAIL_REQUEST,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostDetailSuccess,
  fetchPostDetailFailure,
  type FetchPostDetailRequestAction,
} from "../actions/postsActions"
import type { Post, User, PostWithUser } from "@/types"

function* fetchPostsSaga(): Generator<any, void, any> {
  try {
    const posts: Post[] = yield call(apiService.fetchPosts)
    yield put(fetchPostsSuccess(posts))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch posts"
    yield put(fetchPostsFailure(errorMessage))
  }
}

function* fetchPostDetailSaga(action: FetchPostDetailRequestAction): Generator<any, void, any> {
  try {
    const post: Post = yield call(apiService.fetchPostById, action.payload)
    const user: User = yield call(apiService.fetchUserById, post.userId)

    const postWithUser: PostWithUser = {
      ...post,
      user,
    }

    yield put(fetchPostDetailSuccess(postWithUser))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch post details"
    yield put(fetchPostDetailFailure(errorMessage))
  }
}

export function* postsSaga(): Generator<any, void, any> {
  yield takeLatest(FETCH_POSTS_REQUEST, fetchPostsSaga)
  yield takeLatest(FETCH_POST_DETAIL_REQUEST, fetchPostDetailSaga)
}
