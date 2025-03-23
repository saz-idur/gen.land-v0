"use server"

import { revalidatePath } from "next/cache"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function logSymptom({
  symptom,
  severity,
  notes,
  date,
}: {
  symptom: string
  severity: number
  notes: string
  date: string
}) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to log symptoms",
      }
    }

    await db.symptomRecord.create({
      data: {
        userId: session.user.id,
        symptom,
        severity,
        notes,
        date: new Date(date),
      },
    })

    revalidatePath("/dashboard/symptoms")

    return {
      success: true,
      message: "Symptom logged successfully",
    }
  } catch (error) {
    console.error("Error in logSymptom:", error)
    return {
      success: false,
      message: "Failed to log symptom",
    }
  }
}

export async function deleteSymptom(id: string) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to delete symptoms",
      }
    }

    // Verify the symptom belongs to the user
    const symptom = await db.symptomRecord.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!symptom) {
      return {
        success: false,
        message: "Symptom not found",
      }
    }

    await db.symptomRecord.delete({
      where: {
        id,
      },
    })

    revalidatePath("/dashboard/symptoms")

    return {
      success: true,
      message: "Symptom deleted successfully",
    }
  } catch (error) {
    console.error("Error in deleteSymptom:", error)
    return {
      success: false,
      message: "Failed to delete symptom",
    }
  }
}

