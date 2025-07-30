import { PostCard } from "./PostCard"
import type { Post } from "@/types"

interface PostsGridProps {
  posts: Post[]
}

export function PostsGrid({ posts }: PostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
