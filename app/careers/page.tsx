import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Building, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers at Genrivia | Join Our Team",
  description: "Explore career opportunities at Genrivia and help us transform healthcare with AI technology.",
}

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
                Careers
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Join Us in <span className="gradient-text">Transforming</span> Healthcare
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                At Genrivia, we're building the future of healthcare through AI. Join our team of passionate innovators
                and make a real impact on people's lives.
              </p>

              <Button className="bg-genrivia-blue hover:bg-genrivia-blue/90">
                View Open Positions
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-genrivia-blue/10 to-genrivia-teal/10 rounded-3xl blur-xl"></div>
                <div className="relative glass-card rounded-3xl p-6 shadow-xl">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Genrivia Team Working"
                    width={600}
                    height={400}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20 py-1.5 px-4 rounded-full">
              Why Join Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Life at Genrivia</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're building a team of passionate individuals who are excited about using technology to solve healthcare
              challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Meaningful Impact",
                description:
                  "Work on technology that directly improves people's health and wellbeing. Our AI helps users make better healthcare decisions every day.",
              },
              {
                title: "Innovation-Driven Culture",
                description:
                  "We encourage creative thinking and experimentation. Your ideas matter, and you'll have the freedom to bring them to life.",
              },
              {
                title: "Continuous Learning",
                description:
                  "Healthcare and AI are constantly evolving. We provide resources and opportunities for you to grow your skills and expertise.",
              },
              {
                title: "Inclusive Environment",
                description:
                  "We value diverse perspectives and backgrounds. Our inclusive culture ensures everyone feels welcome and respected.",
              },
              {
                title: "Work-Life Balance",
                description:
                  "We believe in sustainable work practices. Flexible schedules and remote options help you do your best work while maintaining balance.",
              },
              {
                title: "Competitive Benefits",
                description:
                  "Comprehensive healthcare, retirement plans, generous PTO, and more to support you both professionally and personally.",
              },
            ].map((item, index) => (
              <Card key={index} className="glass-card overflow-hidden relative group">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
              Open Positions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're looking for talented individuals to help us build the future of healthcare AI.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                title: "Senior Machine Learning Engineer",
                department: "AI & Data Science",
                location: "Remote (US)",
                type: "Full-time",
              },
              {
                title: "Healthcare Data Scientist",
                department: "AI & Data Science",
                location: "San Francisco, CA",
                type: "Full-time",
              },
              {
                title: "Frontend Engineer (React/Next.js)",
                department: "Engineering",
                location: "Remote (US)",
                type: "Full-time",
              },
              {
                title: "Product Designer (UI/UX)",
                department: "Design",
                location: "San Francisco, CA",
                type: "Full-time",
              },
              {
                title: "Medical Content Specialist",
                department: "Content",
                location: "Remote (US)",
                type: "Contract",
              },
            ].map((job, index) => (
              <Card key={index} className="glass-card overflow-hidden hover:border-genrivia-blue/40 transition-colors">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4 md:mt-0 bg-genrivia-blue hover:bg-genrivia-blue/90">Apply Now</Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-4">Don't see a position that matches your skills?</p>
            <Button variant="outline" className="border-genrivia-teal text-genrivia-teal hover:bg-genrivia-teal/10">
              Send General Application
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our team and help us transform healthcare with AI technology. We're looking for passionate
              individuals who want to make a difference.
            </p>
            <Button className="bg-genrivia-blue hover:bg-genrivia-blue/90">
              View All Open Positions
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

