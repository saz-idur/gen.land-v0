import type React from "react"
import { cn } from "@/lib/utils"
import { Shield, Users, Hospital, Award } from "lucide-react"

interface StatItemProps {
  value: string
  label: string
  icon: React.ReactNode
  className?: string
}

function StatItem({ value, label, icon, className }: StatItemProps) {
  return (
    <div className={cn("flex flex-col items-center text-center p-6", className)}>
      <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-1 gradient-text">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  )
}

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatItem value="92%" label="Diagnostic Accuracy" icon={<Shield className="text-genrivia-blue" size={24} />} />
      <StatItem
        value="250+"
        label="Healthcare Professionals"
        icon={<Users className="text-genrivia-teal" size={24} />}
      />
      <StatItem value="15+" label="Medical Specialties" icon={<Hospital className="text-genrivia-blue" size={24} />} />
      <StatItem value="24/7" label="Availability" icon={<Award className="text-genrivia-teal" size={24} />} />
    </div>
  )
}

