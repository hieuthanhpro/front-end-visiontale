import request from './request'

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const seradielApi = {
  /**
   * Send a message to Seradiel and get response
   */
  async sendMessage(message: string, history: Message[]): Promise<string> {
    try {
      // Note: request.post automatically unwraps the response via interceptor
      // So 'response' here is already the 'data' field from backend
      const response = await request.post('/seradiel/chat', {
        message,
        history: history.slice(-10).map(m => ({
          role: m.role,
          content: m.content
        }))
      })
      
      // Debug: log response
      console.log('Seradiel API response (already unwrapped):', response)
      
      // Backend returns: { response: "..." }
      // After interceptor unwrap, we get: { response: "..." } directly
      const result = response?.response || ''
      console.log('Extracted result:', result)
      
      if (!result) {
        console.warn('Empty response from Seradiel')
      }
      
      return result
    } catch (error) {
      console.error('Error in seradielApi.sendMessage:', error)
      throw error
    }
  },

  /**
   * Stream message response (for future implementation)
   */
  async streamMessage(
    message: string, 
    history: Message[], 
    onChunk: (chunk: string) => void
  ): Promise<void> {
    // TODO: Implement SSE streaming
    const response = await this.sendMessage(message, history)
    onChunk(response)
  }
}

