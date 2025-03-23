import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export default async function DashboardPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to your Genrivia health dashboard." />
      <div className="grid gap-4 md:gap-8">
        <DashboardOverview />
      </div>
    </DashboardShell>
  )
}

