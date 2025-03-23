import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface FloatingTagProps {
  text: string
  className?: string
  color?: "blue" | "teal" | "purple" | "yellow"
  size?: "small" | "medium" | "large"
}

export function FloatingTag({ text, className, color = "blue", size = "medium" }: FloatingTagProps) {
  const colorClasses = {
    blue: "bg-genrivia-blue text-white",
    teal: "bg-genrivia-teal text-white",
    purple: "bg-purple-500 text-white",
    yellow: "bg-yellow-400 text-black",
  }

  const sizeClasses = {
    small: "text-xs py-1 px-2",
    medium: "text-sm py-1.5 px-3",
    large: "text-base py-2 px-4",
  }

  return (
    <Badge
      className={cn(
        "rounded-full font-medium shadow-lg animate-float",
        colorClasses[color],
        sizeClasses[size],
        className,
      )}
    >
      {text}
    </Badge>
  )
}

