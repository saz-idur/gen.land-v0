import { redirect } from "next/navigation"
import Link from "next/link"
import { getAuthSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Calendar, ChevronRight } from "lucide-react"
import { db } from "@/lib/db"
import { formatDistanceToNow } from "date-fns"

export default async function ChatHistoryPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/chat/history")
  }

  const chatSessions = await db.chatSession.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      _count: {
        select: { messages: true },
      },
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Chat History" text="View your previous conversations with Genrivia's AI.">
        <Button asChild className="bg-genrivia-blue hover:bg-genrivia-blue/90">
          <Link href="/dashboard/chat">New Chat</Link>
        </Button>
      </DashboardHeader>

      <div className="mt-8 grid gap-4">
        {chatSessions.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No chat history yet</h3>
                <p className="text-gray-400 mb-4">
                  Start a new conversation with Genrivia's AI to get personalized health guidance.
                </p>
                <Button asChild className="bg-genrivia-blue hover:bg-genrivia-blue/90">
                  <Link href="/dashboard/chat">Start New Chat</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          chatSessions.map((session) => (
            <Card key={session.id} className="glass-card hover:border-genrivia-blue/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{session.title || "Chat Session"}</CardTitle>
                <MessageSquare className="h-5 w-5 text-genrivia-blue" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                    <span className="mx-2">•</span>
                    <span>{session._count.messages} messages</span>
                  </div>
                  <Button asChild variant="ghost" className="p-0 h-auto text-sm font-medium group text-genrivia-blue">
                    <Link href={`/dashboard/chat/${session.id}`}>
                      Continue{" "}
                      <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </DashboardShell>
  )
}

