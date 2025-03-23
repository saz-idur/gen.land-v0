"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Clock, Calendar, CalendarX } from "lucide-react"
import { format } from "date-fns"
import { deleteMedication } from "@/app/actions/medications"
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

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string | Date
  endDate: string | Date | null
  notes: string | null
}

interface MedicationListProps {
  initialMedications: Medication[]
}

export function MedicationList({ initialMedications }: MedicationListProps) {
  const router = useRouter()
  const [medications, setMedications] = useState(initialMedications)
  const [isDeleting, setIsDeleting] = useState(false)
  const [medicationToDelete, setMedicationToDelete] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)

    try {
      const result = await deleteMedication(id)

      if (result.success) {
        setMedications((prev) => prev.filter((medication) => medication.id !== id))
        toast({
          title: "Success",
          description: "Medication deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete medication",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting medication:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setMedicationToDelete(null)
    }
  }

  const isActive = (medication: Medication) => {
    if (!medication.endDate) return true
    return new Date(medication.endDate) >= new Date()
  }

  return (
    <>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Your Medications</CardTitle>
          <CardDescription>Manage your current and past medications.</CardDescription>
        </CardHeader>
        <CardContent>
          {medications.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No medications added yet. Use the form above to add your first medication.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {medications.map((medication) => (
                <div
                  key={medication.id}
                  className={`p-4 rounded-lg border ${
                    isActive(medication) ? "bg-white/5 border-white/10" : "bg-gray-800/30 border-gray-700/30"
                  } flex flex-col md:flex-row md:items-center justify-between gap-4`}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium">{medication.name}</h3>
                      <Badge
                        className={
                          isActive(medication)
                            ? "bg-green-500/20 text-green-500 border-green-500/20"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/20"
                        }
                      >
                        {isActive(medication) ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-400">
                      <p>Dosage: {medication.dosage}</p>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{medication.frequency}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Started: {format(new Date(medication.startDate), "PP")}</span>
                      </div>
                      {medication.endDate && (
                        <div className="flex items-center">
                          <CalendarX className="h-3 w-3 mr-1" />
                          <span>Ends: {format(new Date(medication.endDate), "PP")}</span>
                        </div>
                      )}
                    </div>
                    {medication.notes && <p className="text-sm text-gray-300 mt-2">{medication.notes}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => setMedicationToDelete(medication.id)}
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

      <AlertDialog open={!!medicationToDelete} onOpenChange={() => setMedicationToDelete(null)}>
        <AlertDialogContent className="glass-card border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this medication from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => medicationToDelete && handleDelete(medicationToDelete)}
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

