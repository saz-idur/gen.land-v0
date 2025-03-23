"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Calendar, MessageSquare, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Health Score</CardTitle>
          <Activity className="h-4 w-4 text-genrivia-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">87/100</div>
          <p className="text-xs text-gray-400 mt-1">+2 from last week</p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-genrivia-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-gray-400 mt-1">Next: Tomorrow, 10:00 AM</p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
          <Pill className="h-4 w-4 text-genrivia-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-gray-400 mt-1">1 refill needed</p>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
          <MessageSquare className="h-4 w-4 text-genrivia-teal" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-gray-400 mt-1">Last: 2 hours ago</p>
        </CardContent>
      </Card>

      <Card className="glass-card md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your health activity from the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Today, 2:30 PM", activity: "Logged headache symptoms", type: "symptom" },
              { date: "Yesterday, 9:15 AM", activity: "Medication reminder: Vitamin D", type: "medication" },
              { date: "Mar 15, 11:20 AM", activity: "Chat session about sleep issues", type: "chat" },
              { date: "Mar 14, 8:00 AM", activity: "Logged blood pressure: 120/80", type: "vitals" },
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    item.type === "symptom"
                      ? "bg-yellow-500"
                      : item.type === "medication"
                        ? "bg-genrivia-blue"
                        : item.type === "chat"
                          ? "bg-genrivia-teal"
                          : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm">{item.activity}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card md:col-span-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button
              asChild
              variant="outline"
              className="border-genrivia-blue text-genrivia-blue hover:bg-genrivia-blue/10"
            >
              <Link href="/dashboard/chat">Start New Chat</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-genrivia-teal text-genrivia-teal hover:bg-genrivia-teal/10"
            >
              <Link href="/dashboard/symptoms">Log Symptoms</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-genrivia-blue text-genrivia-blue hover:bg-genrivia-blue/10"
            >
              <Link href="/dashboard/medications">Manage Medications</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-genrivia-teal text-genrivia-teal hover:bg-genrivia-teal/10"
            >
              <Link href="/dashboard/profile">Update Health Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

