"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { joinWaitlist } from "@/app/actions/waitlist"
import { toast } from "@/components/ui/use-toast"

export function WaitlistForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [role, setRole] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    formData.append("role", role)

    try {
      const result = await joinWaitlist(formData)

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        router.push("/waitlist-confirmation")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input name="name" placeholder="Your Name" className="bg-white/5 border-white/10" required />
      </div>
      <div>
        <Input name="email" type="email" placeholder="Your Email" className="bg-white/5 border-white/10" required />
      </div>
      <div>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue placeholder="Your Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="patient">Patient</SelectItem>
            <SelectItem value="doctor">Healthcare Professional</SelectItem>
            <SelectItem value="researcher">Medical Researcher</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Textarea
          name="reason"
          placeholder="Why are you interested in Genrivia?"
          className="bg-white/5 border-white/10 min-h-[100px]"
        />
      </div>
      <Button type="submit" className="w-full bg-genrivia-blue hover:bg-genrivia-blue/90" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Join the Waitlist"}
      </Button>
    </form>
  )
}

