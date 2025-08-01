import type { Post, User } from "@/src/types"

const API_BASE = "https://dummyjson.com"

class ApiService {
 private async makeRequest<T>(url: string): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
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
  } catch (error: any) {
    clearTimeout(timeoutId)

    // Specific handling for network timeout
    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please check your network connection.")
    }

    throw new Error(error?.message || "Unexpected network error occurred.")
  }
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
