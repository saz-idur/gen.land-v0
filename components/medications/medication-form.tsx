"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { addMedication } from "@/app/actions/medications"
import { toast } from "@/components/ui/use-toast"

export function MedicationForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [dosage, setDosage] = useState("")
  const [frequency, setFrequency] = useState("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !dosage.trim() || !frequency.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await addMedication({
        name,
        dosage,
        frequency,
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : undefined,
        notes,
      })

      if (result.success) {
        toast({
          title: "Success",
          description: "Medication added successfully",
        })

        // Reset form
        setName("")
        setDosage("")
        setFrequency("")
        setStartDate(new Date())
        setEndDate(undefined)
        setNotes("")

        // Refresh the page to show the new medication
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to add medication",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error adding medication:", error)
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
        <CardTitle>Add New Medication</CardTitle>
        <CardDescription>Track your medications and their schedules.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Medication Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Aspirin, Lisinopril"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/10"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dosage" className="text-sm font-medium">
                Dosage
              </label>
              <Input
                id="dosage"
                placeholder="e.g., 81mg, 10mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="bg-white/5 border-white/10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="frequency" className="text-sm font-medium">
              Frequency
            </label>
            <Input
              id="frequency"
              placeholder="e.g., Once daily, Twice daily with meals"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="bg-white/5 border-white/10"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="startDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/5 border-white/10",
                      !startDate && "text-gray-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date (Optional)
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="endDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/5 border-white/10",
                      !endDate && "text-gray-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => date < startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </label>
            <Textarea
              id="notes"
              placeholder="Add any additional details about this medication..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] bg-white/5 border-white/10"
            />
          </div>

          <Button type="submit" className="w-full bg-genrivia-blue hover:bg-genrivia-blue/90" disabled={isSubmitting}>
            {isSubmitting ? "Adding Medication..." : "Add Medication"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

