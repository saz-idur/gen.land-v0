import Image from "next/image"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  className?: string
  imageUrl?: string
}

export function TestimonialCard({ quote, author, role, className, imageUrl }: TestimonialCardProps) {
  return (
    <div className={cn("glass-card p-6 rounded-xl relative overflow-hidden", className)}>
      <Quote className="absolute top-4 right-4 text-genrivia-blue/20 h-12 w-12" />
      <div className="relative z-10">
        <p className="text-gray-300 mb-4 relative z-10">{quote}</p>
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-genrivia-blue/10 flex-shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={author}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-genrivia-blue">
                {author.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="font-medium text-white">{author}</p>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

