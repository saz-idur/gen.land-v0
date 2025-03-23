"use server"

import { revalidatePath } from "next/cache"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function addMedication({
  name,
  dosage,
  frequency,
  startDate,
  endDate,
  notes,
}: {
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  notes: string
}) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to add medications",
      }
    }

    await db.medication.create({
      data: {
        userId: session.user.id,
        name,
        dosage,
        frequency,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        notes,
      },
    })

    revalidatePath("/dashboard/medications")

    return {
      success: true,
      message: "Medication added successfully",
    }
  } catch (error) {
    console.error("Error in addMedication:", error)
    return {
      success: false,
      message: "Failed to add medication",
    }
  }
}

export async function deleteMedication(id: string) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to delete medications",
      }
    }

    // Verify the medication belongs to the user
    const medication = await db.medication.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!medication) {
      return {
        success: false,
        message: "Medication not found",
      }
    }

    await db.medication.delete({
      where: {
        id,
      },
    })

    revalidatePath("/dashboard/medications")

    return {
      success: true,
      message: "Medication deleted successfully",
    }
  } catch (error) {
    console.error("Error in deleteMedication:", error)
    return {
      success: false,
      message: "Failed to delete medication",
    }
  }
}

