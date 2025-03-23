import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex-1 space-y-4 md:space-y-8 pt-10">{children}</div>
    </div>
  )
}

