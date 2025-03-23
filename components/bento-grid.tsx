"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface BentoItemProps {
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  className?: string
  imagePosition?: "right" | "bottom" | "background"
  size?: "small" | "medium" | "large"
  accentColor?: "blue" | "teal"
  onClick?: () => void
}

export function BentoItem({
  title,
  description,
  icon,
  image,
  className,
  imagePosition = "right",
  size = "medium",
  accentColor = "blue",
  onClick,
}: BentoItemProps) {
  const colorClasses = {
    blue: "from-genrivia-blue/20 to-transparent border-genrivia-blue/20 hover:border-genrivia-blue/40",
    teal: "from-genrivia-teal/20 to-transparent border-genrivia-teal/20 hover:border-genrivia-teal/40",
  }

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    large: "col-span-1 row-span-1 md:col-span-2 md:row-span-2",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 transition-all duration-300 bg-gradient-to-br backdrop-blur-md border",
        colorClasses[accentColor],
        sizeClasses[size],
        "hover:shadow-lg hover:-translate-y-1",
        className,
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "flex flex-col h-full",
          imagePosition === "right" ? "md:flex-row md:items-center md:gap-6" : "",
          imagePosition === "background" ? "z-10" : "",
        )}
      >
        <div className={cn("flex-1", imagePosition === "background" ? "relative z-10" : "")}>
          {icon && (
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">{icon}</div>
          )}
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>

          {onClick && (
            <Button
              variant="ghost"
              className={cn(
                "p-0 h-auto text-sm font-medium group",
                accentColor === "blue" ? "text-genrivia-blue" : "text-genrivia-teal",
              )}
            >
              Learn more <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>

        {image && imagePosition === "right" && (
          <div className="mt-4 md:mt-0 md:w-1/3 flex-shrink-0">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={200}
                height={200}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        {image && imagePosition === "bottom" && (
          <div className="mt-4 w-full">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={400}
                height={200}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {image && imagePosition === "background" && (
        <div className="absolute inset-0 opacity-10">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      )}
    </div>
  )
}

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">{children}</div>
}

