import type { Post, User } from "@/types"
import { FallbackApiService } from "@/utils/api-fallback"

const API_BASE = "https://jsonplaceholder.typicode.com"

class ApiService {
  private fallbackService = new FallbackApiService()

  private async makeRequest<T>(url: string): Promise<T> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(`${API_BASE}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.warn(`API request failed for ${url}:`, error)
      throw error
    }
  }

  async getPosts(): Promise<Post[]> {
    try {
      return await this.makeRequest<Post[]>("/posts")
    } catch (error) {
      console.warn("Falling back to mock data for posts")
      return await this.fallbackService.getPosts()
    }
  }

  async getPost(id: number): Promise<Post> {
    try {
      return await this.makeRequest<Post>(`/posts/${id}`)
    } catch (error) {
      console.warn(`Falling back to mock data for post ${id}`)
      return await this.fallbackService.getPost(id)
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      return await this.makeRequest<User>(`/users/${id}`)
    } catch (error) {
      console.warn(`Falling back to mock data for user ${id}`)
      return await this.fallbackService.getUser(id)
    }
  }
}

// Create and export a single instance
const apiService = new ApiService()

// Ensure the service is never null
if (!apiService) {
  throw new Error("Failed to create API service")
}

export { apiService }
export default apiService
