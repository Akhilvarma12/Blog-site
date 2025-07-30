import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import { postsReducer } from "./reducer"
import { rootSaga } from "./sagas"

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  onError: (error) => {
    console.error("Saga error:", error)
  },
})

// Create store with middleware
const composeEnhancers =
  (typeof window !== "undefined" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(postsReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

// Run the saga with error handling
try {
  sagaMiddleware.run(rootSaga)
} catch (error) {
  console.error("Failed to start saga:", error)
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
