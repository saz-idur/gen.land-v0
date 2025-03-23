"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Shield, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface FeatureModalProps {
  isOpen: boolean
  onClose: () => void
  feature: {
    id: number
    title: string
    description: string
    longDescription: string
    icon: React.ReactNode
  }
}

export function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] glass-card border-genrivia-blue/20">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-genrivia-blue/10 flex items-center justify-center">
              {feature.icon}
            </div>
            <DialogTitle className="text-xl font-semibold">{feature.title}</DialogTitle>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20">
              <Shield className="w-3 h-3 mr-1" /> 92% Accuracy
            </Badge>
          </div>
          <DialogDescription className="text-gray-300 text-sm">{feature.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>{feature.longDescription}</p>
          </div>
        </ScrollArea>
        <div className="mt-6 flex justify-end">
          <Button className="bg-genrivia-blue hover:bg-genrivia-blue/90">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

