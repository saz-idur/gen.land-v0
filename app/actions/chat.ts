"use server"

import { revalidatePath } from "next/cache"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function sendChatMessage({
  chatSessionId,
  content,
}: {
  chatSessionId: string
  content: string
}) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to send messages",
      }
    }

    // Save user message to database
    const userMessage = await db.chatMessage.create({
      data: {
        chatSessionId,
        role: "user",
        content,
      },
    })

    // Get previous messages for context (limit to last 10 for simplicity)
    const previousMessages = await db.chatMessage.findMany({
      where: {
        chatSessionId,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
    })

    // Format messages for AI
    const messageHistory = previousMessages
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n")

    // Generate AI response
    const prompt = `
You are Genrivia, an advanced healthcare AI assistant with 92% diagnostic accuracy. You provide helpful, accurate, and compassionate health guidance.

Previous conversation:
${messageHistory}

User: ${content}

Provide a helpful response. If the user is describing medical symptoms, ask clarifying questions and provide possible explanations, but always emphasize that you're not a replacement for professional medical advice. For general health questions, provide evidence-based information. Be conversational and empathetic.
`

    const { text: aiResponse } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are Genrivia, an advanced healthcare AI assistant. You provide helpful, accurate, and compassionate health guidance based on the latest medical research. You always clarify that you're not a replacement for professional medical advice for serious concerns.",
    })

    // Save AI response to database
    const assistantMessage = await db.chatMessage.create({
      data: {
        chatSessionId,
        role: "assistant",
        content: aiResponse,
      },
    })

    // Update chat session title if it's still the default
    const chatSession = await db.chatSession.findUnique({
      where: { id: chatSessionId },
    })

    if (chatSession?.title === "New Chat Session") {
      // Generate a title based on the first user message
      const { text: generatedTitle } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate a short, concise title (5 words or less) for a chat about: "${content}"`,
      })

      await db.chatSession.update({
        where: { id: chatSessionId },
        data: { title: generatedTitle.trim() },
      })
    }

    revalidatePath(`/dashboard/chat/${chatSessionId}`)
    revalidatePath("/dashboard/chat/history")

    return {
      success: true,
      messageId: assistantMessage.id,
      reply: aiResponse,
    }
  } catch (error) {
    console.error("Error in sendChatMessage:", error)
    return {
      success: false,
      message: "Failed to send message",
    }
  }
}

