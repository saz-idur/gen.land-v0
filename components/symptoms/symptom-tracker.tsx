"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { logSymptom } from "@/app/actions/symptoms"
import { toast } from "@/components/ui/use-toast"

export function SymptomTracker() {
  const router = useRouter()
  const [symptom, setSymptom] = useState("")
  const [severity, setSeverity] = useState(5)
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!symptom.trim()) {
      toast({
        title: "Error",
        description: "Please enter a symptom",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await logSymptom({
        symptom,
        severity,
        notes,
        date: date.toISOString(),
      })

      if (result.success) {
        toast({
          title: "Success",
          description: "Symptom logged successfully",
        })

        // Reset form
        setSymptom("")
        setSeverity(5)
        setNotes("")
        setDate(new Date())

        // Refresh the page to show the new symptom
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to log symptom",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error logging symptom:", error)
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
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Log a New Symptom</CardTitle>
        <CardDescription>Record your symptoms to track your health over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="symptom" className="text-sm font-medium">
                Symptom
              </label>
              <Input
                id="symptom"
                placeholder="e.g., Headache, Fatigue, Nausea"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                className="bg-white/5 border-white/10"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/5 border-white/10",
                      !date && "text-gray-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="severity" className="text-sm font-medium">
                Severity (1-10)
              </label>
              <span className="text-sm font-medium">{severity}</span>
            </div>
            <Slider
              id="severity"
              min={1}
              max={10}
              step={1}
              value={[severity]}
              onValueChange={(value) => setSeverity(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </label>
            <Textarea
              id="notes"
              placeholder="Add any additional details about your symptom..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] bg-white/5 border-white/10"
            />
          </div>

          <Button type="submit" className="w-full bg-genrivia-blue hover:bg-genrivia-blue/90" disabled={isSubmitting}>
            {isSubmitting ? "Logging Symptom..." : "Log Symptom"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

