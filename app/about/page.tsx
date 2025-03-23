import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Shield, ChevronRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Genrivia | Advanced Healthcare AI",
  description: "Learn about Genrivia's mission to make healthcare accessible for everyone through AI technology.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
                Our Mission
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Making Healthcare <span className="gradient-text">Accessible</span> for Everyone
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Genrivia was founded with a simple yet powerful mission: to democratize healthcare knowledge and make
                personalized health guidance available to everyone, everywhere.
              </p>

              <Button className="bg-genrivia-blue hover:bg-genrivia-blue/90">
                Join Our Mission
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-genrivia-blue/10 to-genrivia-teal/10 rounded-3xl blur-xl"></div>
                <div className="relative glass-card rounded-3xl p-6 shadow-xl">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Genrivia Team"
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

      {/* Our Story Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20 py-1.5 px-4 rounded-full">
              Our Story
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Journey Behind Genrivia</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From a simple idea to an AI-powered healthcare companion with 92% diagnostic accuracy, our journey has
              been driven by a passion for innovation and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">How It All Started</h3>
              <p className="text-gray-300 mb-6">
                Genrivia began in 2021 when our founders, a team of healthcare professionals and AI specialists,
                recognized a critical gap in healthcare accessibility. They witnessed firsthand how limited access to
                medical knowledge and guidance affected patient outcomes.
              </p>
              <p className="text-gray-300 mb-6">
                The vision was clear: create an AI companion that could provide accurate, personalized healthcare
                guidance to anyone, anywhere, at any time. After years of research, development, and clinical
                validation, Genrivia was born.
              </p>
              <p className="text-gray-300">
                Today, with 92% diagnostic accuracy and a growing community of healthcare professionals and users, we're
                just getting started on our mission to transform healthcare through AI.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Genrivia Founders"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Drives Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              At Genrivia, our core values guide everything we do, from product development to user interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Accuracy & Trust",
                description:
                  "We're committed to providing the most accurate healthcare information possible, with rigorous validation by medical professionals.",
                icon: <Shield className="text-genrivia-blue" size={32} />,
              },
              {
                title: "Accessibility for All",
                description:
                  "We believe everyone deserves access to quality healthcare guidance, regardless of location, background, or circumstances.",
                icon: <Users className="text-genrivia-teal" size={32} />,
              },
              {
                title: "Continuous Improvement",
                description:
                  "We're constantly learning, evolving, and improving our AI to better serve the healthcare needs of our users.",
                icon: <Award className="text-genrivia-blue" size={32} />,
              },
            ].map((item, index) => (
              <Card key={index} className="glass-card overflow-hidden relative group">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:text-genrivia-blue transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20 py-1.5 px-4 rounded-full">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Minds Behind Genrivia</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our diverse team of healthcare professionals, AI specialists, and technology innovators work together to
              make Genrivia's vision a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Co-Founder & Chief Medical Officer",
                bio: "Board-certified physician with 15+ years of experience in internal medicine and digital health.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Michael Rodriguez",
                role: "Co-Founder & CEO",
                bio: "Former healthcare executive with a passion for making quality healthcare accessible to everyone.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Dr. James Taylor",
                role: "Chief AI Officer",
                bio: "AI researcher with a PhD in machine learning and 10+ years of experience in healthcare AI applications.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Lisa Kim",
                role: "Chief Product Officer",
                bio: "Product leader with extensive experience in healthcare technology and user-centered design.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <Card key={index} className="glass-card overflow-hidden">
                <div className="aspect-square">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-sm text-genrivia-blue mb-2">{member.role}</p>
                  <p className="text-sm text-gray-400">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/careers">
              <Button variant="outline" className="border-genrivia-blue text-genrivia-blue hover:bg-genrivia-blue/10">
                Join Our Team
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of the Healthcare Revolution</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join us in our mission to make healthcare accessible for everyone through AI technology. Whether as a
              user, partner, or team member, there's a place for you in the Genrivia community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-genrivia-blue hover:bg-genrivia-blue/90">Join the Waitlist</Button>
              <Button variant="outline" className="border-genrivia-teal text-genrivia-teal hover:bg-genrivia-teal/10">
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

