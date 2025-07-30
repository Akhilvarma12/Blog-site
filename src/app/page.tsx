"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/src/store"
import { fetchPostsRequest } from "@/src/store/actions"
import { PostsGrid } from "@/src/components/PostsGrid"
import { LoadingSpinner } from "@/src/components/LoadingSpinner"
import { ErrorDisplay } from "@/src/components/ErrorDisplay"

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>() // Type the dispatch directly
  // Adjust based on your actual state structure
  const posts = useSelector((state: RootState) => state.posts) // If posts is just an array
  const loading = useSelector((state: RootState) => state.loading) // If loading is at root level
  const error = useSelector((state: RootState) => state.error) // If error is at root level

  useEffect(() => {
    dispatch(fetchPostsRequest())
  }, [dispatch])

  const handleRetry = () => {
    dispatch(fetchPostsRequest())
  }

  if (loading && posts.length === 0) {
    return <LoadingSpinner message="Loading posts..." />
  }

  if (error && posts.length === 0) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to Our Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover amazing articles and insights from our community of writers.
        </p>
      </div>

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