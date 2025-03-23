"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  reason: z.string().optional(),
  role: z.string().optional(),
})

export async function joinWaitlist(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const reason = formData.get("reason") as string
    const role = formData.get("role") as string

    const validatedFields = waitlistSchema.safeParse({
      email,
      name,
      reason,
      role,
    })

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Please check your inputs and try again.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    // Check if email already exists in waitlist
    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email },
    })

    if (existingEntry) {
      return {
        success: false,
        message: "This email is already on our waitlist.",
      }
    }

    // Create new waitlist entry
    await prisma.waitlistEntry.create({
      data: {
        email,
        name,
        reason,
        role,
      },
    })

    return {
      success: true,
      message: "You've been added to our waitlist! We'll be in touch soon.",
    }
  } catch (error) {
    console.error("Waitlist submission error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

