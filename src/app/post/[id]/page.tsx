"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import type { RootState, AppDispatch } from "@/src/store"
import { fetchPostDetailRequest, clearCurrentPost } from "@/src/store/actions"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { LoadingSpinner } from "@/src/components/LoadingSpinner"
import { ErrorDisplay } from "@/src/components/ErrorDisplay"
import { ArrowLeft, Eye, ThumbsUp, ThumbsDown, Hash, User } from "lucide-react"

export default function PostDetailPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const params = useParams()
  const postId = params.id ? Number.parseInt(params.id as string, 10) : null

  const currentPost = useSelector((state: RootState) => state.currentPost)
  const loading = useSelector((state: RootState) => state.loading)
  const error = useSelector((state: RootState) => state.error)

  useEffect(() => {
    if (postId && !isNaN(postId)) {
      dispatch(fetchPostDetailRequest(postId))
    }

    return () => {
      dispatch(clearCurrentPost())
    }
  }, [dispatch, postId])

  const handleRetry = () => {
    if (postId && !isNaN(postId)) {
      dispatch(fetchPostDetailRequest(postId))
    }
  }

  const handleBack = () => {
    router.push("/")
  }

  if (!postId || isNaN(postId)) {
    return (
      <div className="space-y-4">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <ErrorDisplay message="Invalid post ID" />
      </div>
    )
  }

  if (loading) {
    return <LoadingSpinner message="Loading post details..." />
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <ErrorDisplay message={error} onRetry={handleRetry} />
      </div>
    )
  }

  if (!currentPost) {
    return (
      <div className="space-y-4">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <ErrorDisplay message="Post not found" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button onClick={handleBack} variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Posts
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary">Post #{currentPost.id}</Badge>
            <Badge variant="outline">
              <User className="mr-1 h-3 w-3" />
              User ID: {currentPost.userId}
            </Badge>
          </div>
          <CardTitle className="text-2xl md:text-3xl">{currentPost.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-6">{currentPost.body}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {currentPost.tags?.map((tag: string) => (
              <Badge key={tag} variant="outline" className="flex items-center text-sm">
                <Hash className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground items-center">
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {currentPost.views} views
            </span>
            <span className="flex items-center">
              <ThumbsUp className="mr-1 h-4 w-4" />
              {currentPost.reactions?.likes ?? 0} likes
            </span>
            <span className="flex items-center">
              <ThumbsDown className="mr-1 h-4 w-4" />
              {currentPost.reactions?.dislikes ?? 0} dislikes
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
