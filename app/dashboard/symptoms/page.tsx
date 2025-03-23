import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SymptomTracker } from "@/components/symptoms/symptom-tracker"
import { SymptomHistory } from "@/components/symptoms/symptom-history"
import { db } from "@/lib/db"

export default async function SymptomsPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/symptoms")
  }

  // Get user's symptom history
  const symptoms = await db.symptomRecord.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      date: "desc",
    },
    take: 20,
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Symptom Tracker"
        text="Track your symptoms over time to identify patterns and share with healthcare providers."
      />
      <div className="grid gap-8 mt-8">
        <SymptomTracker />
        <SymptomHistory initialSymptoms={symptoms} />
      </div>
    </DashboardShell>
  )
}

