"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { format } from "date-fns"
import { deleteSymptom } from "@/app/actions/symptoms"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface SymptomRecord {
  id: string
  symptom: string
  severity: number
  date: string | Date
  notes: string | null
}

interface SymptomHistoryProps {
  initialSymptoms: SymptomRecord[]
}

export function SymptomHistory({ initialSymptoms }: SymptomHistoryProps) {
  const router = useRouter()
  const [symptoms, setSymptoms] = useState(initialSymptoms)
  const [isDeleting, setIsDeleting] = useState(false)
  const [symptomToDelete, setSymptomToDelete] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)

    try {
      const result = await deleteSymptom(id)

      if (result.success) {
        setSymptoms((prev) => prev.filter((symptom) => symptom.id !== id))
        toast({
          title: "Success",
          description: "Symptom deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete symptom",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting symptom:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setSymptomToDelete(null)
    }
  }

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return "bg-green-500/20 text-green-500 border-green-500/20"
    if (severity <= 6) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/20"
    return "bg-red-500/20 text-red-500 border-red-500/20"
  }

  return (
    <>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Symptom History</CardTitle>
          <CardDescription>Your recently logged symptoms and their severity.</CardDescription>
        </CardHeader>
        <CardContent>
          {symptoms.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No symptoms logged yet. Use the form above to log your first symptom.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium">{symptom.symptom}</h3>
                      <Badge className={getSeverityColor(symptom.severity)}>Severity: {symptom.severity}/10</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{format(new Date(symptom.date), "PPP")}</p>
                    {symptom.notes && <p className="text-sm text-gray-300">{symptom.notes}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => setSymptomToDelete(symptom.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!symptomToDelete} onOpenChange={() => setSymptomToDelete(null)}>
        <AlertDialogContent className="glass-card border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this symptom record from your history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => symptomToDelete && handleDelete(symptomToDelete)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

