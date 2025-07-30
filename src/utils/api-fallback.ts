import type { Post, User } from "@/src/types"

// Fallback API service that creates mock data if the real API fails
export class FallbackApiService {
  async getPosts(): Promise<Post[]> {
    // Return mock posts if API fails
    return [
      {
        id: 1,
        title: "Welcome to Redux-Saga Blog",
        body: "This is a sample post to demonstrate the Redux-Saga blog application. The real API might be temporarily unavailable.",
        userId: 1,
      },
      {
        id: 2,
        title: "Understanding Redux-Saga",
        body: "Redux-Saga is a library that aims to make application side effects easier to manage, more efficient to execute, and better at handling failures.",
        userId: 1,
      },
      {
        id: 3,
        title: "Next.js App Router",
        body: "The App Router is a new paradigm for building applications using React's latest features such as Server Components and Streaming.",
        userId: 2,
      },
    ]
  }

  async getPost(id: number): Promise<Post> {
    const posts = await this.getPosts()
    const post = posts.find((p) => p.id === id)
    if (!post) {
      throw new Error(`Post with id ${id} not found`)
    }
    return post
  }

  async getUser(id: number): Promise<User> {
    // Return mock user data
    return {
      id,
      name: "Sample User",
      username: "sampleuser",
      email: "sample@example.com",
      address: {
        street: "123 Sample St",
        suite: "Apt 1",
        city: "Sample City",
        zipcode: "12345",
        geo: {
          lat: "0",
          lng: "0",
        },
      },
      phone: "555-0123",
      website: "example.com",
      company: {
        name: "Sample Company",
        catchPhrase: "Making samples great",
        bs: "sample-driven development",
      },
    }
  }
}
