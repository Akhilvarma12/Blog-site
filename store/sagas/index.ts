import { all, fork } from "redux-saga/effects"
import { postsSaga } from "./postsSaga"

export function* rootSaga(): Generator<any, void, any> {
  yield all([fork(postsSaga)])
}
