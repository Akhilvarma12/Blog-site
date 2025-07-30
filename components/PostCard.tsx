import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Post } from "@/types"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="flex-grow">
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">{post.body}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link href={`/post/${post.id}`}>
          <Button variant="outline" className="w-full bg-transparent">
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
