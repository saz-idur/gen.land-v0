import { Avatar } from "@/components/ui/avatar"
import { User } from "lucide-react"
import Image from "next/image"

interface ChatMessageProps {
  role: string
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} max-w-[80%] gap-3`}>
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <Avatar className="h-8 w-8 bg-genrivia-teal/20 text-genrivia-teal">
              <User className="h-5 w-5" />
            </Avatar>
          ) : (
            <Avatar className="h-8 w-8 bg-genrivia-blue/20">
              <div className="relative w-5 h-5">
                <Image src="/images/genrivia-logo.png" alt="Genrivia Logo" fill className="object-contain" />
              </div>
            </Avatar>
          )}
        </div>

        <div
          className={`p-4 rounded-lg ${
            isUser
              ? "bg-genrivia-teal/5 border border-genrivia-teal/10"
              : "bg-genrivia-blue/5 border border-genrivia-blue/10"
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </div>
  )
}

