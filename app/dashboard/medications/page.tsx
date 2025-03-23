import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { MedicationForm } from "@/components/medications/medication-form"
import { MedicationList } from "@/components/medications/medication-list"
import { db } from "@/lib/db"

export default async function MedicationsPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/medications")
  }

  // Get user's medications
  const medications = await db.medication.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      startDate: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Medication Management" text="Track your medications, dosages, and schedules." />
      <div className="grid gap-8 mt-8">
        <MedicationForm />
        <MedicationList initialMedications={medications} />
      </div>
    </DashboardShell>
  )
}

