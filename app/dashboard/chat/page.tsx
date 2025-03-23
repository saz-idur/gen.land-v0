import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ChatInterface } from "@/components/chat/chat-interface"
import { db } from "@/lib/db"

export default async function ChatPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/chat")
  }

  // Get or create a new chat session
  const chatSession = await db.chatSession.create({
    data: {
      userId: session.user.id,
      title: "New Chat Session",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Health Assistant"
        text="Chat with Genrivia's AI to get personalized health guidance."
      />
      <div className="mt-8">
        <ChatInterface chatSessionId={chatSession.id} />
      </div>
    </DashboardShell>
  )
}

