import { redirect } from "next/navigation"
import Link from "next/link"
import { getAuthSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat/chat-interface"
import { db } from "@/lib/db"
import { ArrowLeft } from "lucide-react"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/chat")
  }

  // Verify the chat session exists and belongs to the user
  const chatSession = await db.chatSession.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  })

  if (!chatSession) {
    redirect("/dashboard/chat")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={chatSession.title || "Chat Session"}
        text="Continue your conversation with Genrivia's AI."
      >
        <div className="flex space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/chat/history">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to History
            </Link>
          </Button>
          <Button asChild className="bg-genrivia-blue hover:bg-genrivia-blue/90" size="sm">
            <Link href="/dashboard/chat">New Chat</Link>
          </Button>
        </div>
      </DashboardHeader>
      <div className="mt-8">
        <ChatInterface chatSessionId={params.id} />
      </div>
    </DashboardShell>
  )
}

