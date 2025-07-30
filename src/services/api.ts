import type { Post, User } from "@/src/types"

const API_BASE = "https://jsonplaceholder.typicode.com"

class ApiService {
  private async makeRequest<T>(url: string): Promise<T> {
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
  }

  async getPosts(): Promise<Post[]> {
    return await this.makeRequest<Post[]>("/posts")
  }

  async getPost(id: number): Promise<Post> {
    return await this.makeRequest<Post>(`/posts/${id}`)
  }

  async getUser(id: number): Promise<User> {
    return await this.makeRequest<User>(`/users/${id}`)
  }
}

const apiService = new ApiService()

export { apiService }
export default apiService
