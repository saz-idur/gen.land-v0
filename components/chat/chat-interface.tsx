"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send } from "lucide-react"
import { ChatMessage } from "@/components/chat/chat-message"
import { sendChatMessage } from "@/app/actions/chat"

interface ChatInterfaceProps {
  chatSessionId: string
}

export function ChatInterface({ chatSessionId }: ChatInterfaceProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<Array<{ role: string; content: string; id: string }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome-message",
        role: "assistant",
        content:
          "Hello! I'm Genrivia, your AI health assistant. How can I help you today? You can ask me about symptoms, medications, general health questions, or request personalized health guidance.",
      },
    ])
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message to the UI immediately
    const userMessageObj = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
    }

    setMessages((prev) => [...prev, userMessageObj])
    setIsLoading(true)

    try {
      const response = await sendChatMessage({
        chatSessionId,
        content: userMessage,
      })

      if (response.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: response.messageId || Date.now().toString(),
            role: "assistant",
            content: response.reply,
          },
        ])
      } else {
        // Handle error
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "I'm sorry, I encountered an error processing your request. Please try again.",
          },
        ])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] glass-card rounded-xl overflow-hidden">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} content={message.content} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 p-4 rounded-lg bg-genrivia-blue/5 border border-genrivia-blue/10 w-fit ml-auto">
              <Loader2 className="h-4 w-4 animate-spin text-genrivia-blue" />
              <span className="text-sm text-gray-400">Genrivia is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-white/10 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[60px] max-h-[120px] bg-white/5 border-white/10 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button
            type="submit"
            className="bg-genrivia-blue hover:bg-genrivia-blue/90 self-end h-[60px] w-[60px]"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

