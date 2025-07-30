"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import type { RootState, AppDispatch } from "@/store"
import { fetchPostDetailRequest, clearCurrentPost } from "@/store/actions/postsActions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorDisplay } from "@/components/ErrorDisplay"
import { ArrowLeft, User, Mail, Phone, Globe } from "lucide-react"

export default function PostDetailPage() {
  const dispatch = useDispatch<AppDispatch>() // Type the dispatch
  const router = useRouter()
  const params = useParams()
  const postId = params.id ? Number.parseInt(params.id as string, 10) : null

  // Match your current state structure  
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
            {currentPost.user && (
              <Badge variant="outline">
                <User className="mr-1 h-3 w-3" />
                {currentPost.user.name}
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl md:text-3xl">{currentPost.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{currentPost.body}</p>
        </CardContent>
      </Card>

      {currentPost.user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              About the Author
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-lg">{currentPost.user.name}</h4>
                <p className="text-muted-foreground">@{currentPost.user.username}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4" />
                  <a href={`mailto:${currentPost.user.email}`} className="hover:underline">
                    {currentPost.user.email}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{currentPost.user.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Globe className="mr-2 h-4 w-4" />
                  <a
                    href={`http://${currentPost.user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {currentPost.user.website}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h5 className="font-medium mb-2">Company</h5>
              <p className="text-sm text-muted-foreground">
                <strong>{currentPost.user.company.name}</strong> - {currentPost.user.company.catchPhrase}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{currentPost.user.company.bs}</p>
            </div>

            <div className="pt-4 border-t">
              <h5 className="font-medium mb-2">Address</h5>
              <p className="text-sm text-muted-foreground">
                {currentPost.user.address.street}, {currentPost.user.address.suite}
                <br />
                {currentPost.user.address.city}, {currentPost.user.address.zipcode}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}