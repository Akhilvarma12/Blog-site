import type { Post, User } from "@/src/types"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

class ApiService {
  private async request<T>(endpoint: string): Promise<T> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout")
        }
        throw error
      }
      throw new Error("An unexpected error occurred")
    }
  }

  async fetchPosts(): Promise<Post[]> {
    return this.request<Post[]>("/posts")
  }

  async fetchPostById(id: number): Promise<Post> {
    return this.request<Post>(`/posts/${id}`)
  }

  async fetchUserById(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`)
  }
}

export const apiService = new ApiService()
