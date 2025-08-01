"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/src/store"
import { fetchPostsRequest } from "@/src/store/actions"
import { PostsGrid } from "@/src/components/PostsGrid"
import { LoadingSpinner } from "@/src/components/LoadingSpinner"
import { ErrorDisplay } from "@/src/components/ErrorDisplay"
import type { Post } from "@/src/types"  // Ensure this matches the updated Post interface

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const posts = useSelector((state: RootState) => state.posts) as Post[]
  const loading = useSelector((state: RootState) => state.loading)
  const error = useSelector((state: RootState) => state.error)

  useEffect(() => {
    dispatch(fetchPostsRequest())
  }, [dispatch])

  const handleRetry = () => {
    dispatch(fetchPostsRequest())
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to Our Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover amazing articles and insights from our community of writers.
        </p>
      </div>

      {loading && posts.length === 0 && (
        <LoadingSpinner message="Loading posts..." />
      )}

      {error && posts.length === 0 && (
        <ErrorDisplay message={error} onRetry={handleRetry} />
      )}

      {posts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <PostsGrid posts={posts} />
        </div>
      )}

      {error && posts.length > 0 && (
        <div className="mt-8">
          <ErrorDisplay message={error} onRetry={handleRetry} />
        </div>
      )}
    </div>
  )
}
