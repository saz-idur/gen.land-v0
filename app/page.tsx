"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { FeatureModal } from "@/components/feature-modal"
import { BentoGrid, BentoItem } from "@/components/bento-grid"
import { TestimonialCard } from "@/components/testimonial-card"
import { StatsSection } from "@/components/stats-section"
import {
  Brain,
  Pill,
  Activity,
  FileText,
  MessageSquare,
  Shield,
  Zap,
  CheckCircle,
  ChevronRight,
  Stethoscope,
  Users,
  User,
  ArrowRight,
  Eye,
  HeartPulse,
  Lock,
} from "lucide-react"

// Feature data with long descriptions
const featuresData = [
  {
    id: 1,
    title: "AI-Powered Symptom Checker",
    description: "Analyze symptoms and provide potential diagnoses with detailed explanations and next steps.",
    icon: <Activity className="text-genrivia-blue" size={24} />,
    longDescription:
      "The AI-Powered Symptom Checker and Diagnostic Assistant allows users to input their symptoms, health concerns, or medical history into the platform for a detailed preliminary analysis. By leveraging deep learning models trained on vast medical datasets, this feature provides a list of potential conditions along with their likelihood scores. It also suggests appropriate actions such as home remedies, over-the-counter medications, or lifestyle adjustments while determining whether professional consultation is necessary. Additionally, the AI continuously refines its diagnostic accuracy by learning from real-world interactions and medical literature updates. This feature has broad applications, including reducing unnecessary emergency visits, supporting telemedicine services, offering accessible healthcare advice in remote areas, and assisting individuals in managing chronic conditions by identifying early warning signs.",
  },
  {
    id: 2,
    title: "Personalized Health Monitoring",
    description: "Track health metrics and receive AI-driven insights and recommendations for improvement.",
    icon: <HeartPulse className="text-genrivia-teal" size={24} />,
    longDescription:
      "The Personalized Health Monitoring and Wellness Plans feature utilizes AI to create dynamic, customized health plans tailored to users' medical history, lifestyle preferences, and daily habits. By analyzing wearable device data, dietary inputs, exercise routines, and stress levels, the system continuously adjusts recommendations to optimize overall well-being. The feature provides real-time tracking of health metrics such as heart rate variability, blood glucose levels, and sleep quality while offering actionable insights like optimized meal plans, mindfulness exercises, and fitness routines. Its applications extend to preventive healthcare, chronic disease management (e.g., diabetes, hypertension), post-surgical recovery monitoring, and mental health support, ensuring users can maintain a balanced and healthy lifestyle with minimal manual effort.",
  },
  {
    id: 3,
    title: "Medication Management",
    description: "Monitor medications, get reminders, and receive alerts about potential interactions.",
    icon: <Pill className="text-genrivia-blue" size={24} />,
    longDescription:
      "The Medication Management and Adherence Monitoring system helps users maintain proper medication schedules through AI-driven reminders, dosage tracking, and side effect monitoring. The system can detect potential drug interactions based on user prescriptions and medical history, sending alerts to prevent adverse effects. Additionally, it offers automatic refill reminders and allows users to order medications from partnered pharmacies. The AI adapts to user behavior, ensuring that individuals with complex medication regimens, such as elderly patients or those with chronic illnesses, adhere to their treatment plans. This feature is particularly useful for patients managing multiple prescriptions, reducing hospital readmission rates due to medication non-adherence, and enhancing remote patient monitoring for healthcare providers.",
  },
  {
    id: 4,
    title: "Skin Condition Analysis",
    description: "Upload images for AI-powered analysis of skin conditions with care recommendations.",
    icon: <Eye className="text-genrivia-teal" size={24} />,
    longDescription:
      "The AI for Skin Condition Analysis and Care feature enables users to upload images of their skin concerns for instant AI-powered evaluation. The system can detect conditions such as acne, eczema, psoriasis, and even potential skin cancers by analyzing dermatological images and cross-referencing them with an extensive medical database. Based on the analysis, it suggests skincare routines, over-the-counter treatments, or referrals to dermatologists for further assessment. This feature finds applications in early detection of skin cancer, improving skincare regimens, reducing unnecessary dermatology visits, and assisting telemedicine consultations where users can share AI-generated diagnostic reports with medical professionals for faster decision-making.",
  },
  {
    id: 5,
    title: "AI-Powered Nutrition Planner",
    description: "Get personalized nutrition plans based on health goals, preferences, and medical conditions.",
    icon: <FileText className="text-genrivia-blue" size={24} />,
    longDescription:
      "The AI-Powered Nutrition and Diet Planner provides personalized meal plans based on a user's dietary preferences, medical conditions, and health goals. The system analyzes factors such as metabolic rate, nutrient deficiencies, and allergies to create tailored nutrition recommendations. It also tracks daily food intake and suggests healthier alternatives to maintain balanced nutrition. The applications of this feature include managing weight loss, controlling chronic diseases like diabetes and hypertension, improving digestive health, optimizing athletic performance, and helping individuals transition to healthier eating habits by making informed dietary choices.",
  },
  {
    id: 6,
    title: "Health Knowledge Management",
    description:
      "Access a vast database of medical information, research, and best practices through natural conversation.",
    icon: <Brain className="text-genrivia-teal" size={24} />,
    longDescription:
      "The AI-Powered Medicine and Health Knowledge Management system offers a comprehensive, continuously updated database of medical treatments, medications, and procedures. It simplifies complex medical information, allowing users to understand their healthcare options better. The AI uses natural language processing (NLP) to answer user queries in an intuitive manner, ensuring accessibility for individuals with minimal medical knowledge. Its applications include patient education, supporting medical students in learning about various conditions and treatments, helping doctors stay updated with the latest medical advancements, and providing easily digestible medical content for caregivers and patients alike.",
  },
  // Keeping the first 6 features for brevity, but the full list would be included
]

// Testimonials data
const testimonials = [
  {
    quote:
      "Genrivia has transformed how I manage my diabetes. The personalized insights and reminders have helped me maintain stable blood sugar levels for months.",
    author: "Michael R.",
    role: "Patient with Type 2 Diabetes",
  },
  {
    quote:
      "As a family physician, Genrivia helps me provide more personalized care. The AI-generated insights before appointments save me time and improve patient outcomes.",
    author: "Dr. Sarah Chen",
    role: "Family Medicine Physician",
  },
  {
    quote:
      "The symptom checker correctly identified my rare condition after months of inconclusive doctor visits. This technology is truly revolutionary.",
    author: "James T.",
    role: "Healthcare Consumer",
  },
  {
    quote:
      "Genrivia's medication management system has been a lifesaver for my elderly mother who takes multiple medications. No more missed doses or confusion.",
    author: "Lisa K.",
    role: "Caregiver",
  },
]

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<(typeof featuresData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openFeatureModal = (feature: (typeof featuresData)[0]) => {
    setSelectedFeature(feature)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob h-64 w-64 bg-genrivia-teal/10 top-1/4 -left-32 animate-blob animation-delay-2000"></div>
        <div className="blob h-96 w-96 bg-genrivia-blue/10 top-1/3 -right-48 animate-blob animation-delay-4000"></div>
        <div className="blob h-80 w-80 bg-genrivia-accent/10 bottom-1/4 left-1/3 animate-blob"></div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full animate-pulse-slow">
                Currently in Beta | Limited Early Access Spots Available
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Making <span className="gradient-text">Healthcare</span> Accessible for Everyone
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Meet Genrivia — The AI-powered healthcare companion with 92% diagnostic accuracy that simplifies medical
                knowledge, monitors your health, and provides personalized guidance when you need it most.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-genrivia-blue hover:bg-genrivia-blue/90 text-white">
                  Join the Early Access Waitlist
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-genrivia-teal text-genrivia-teal hover:bg-genrivia-teal/10"
                >
                  Preview Genrivia in Action
                </Button>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <Badge className="bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20 py-1.5 px-4 rounded-full">
                  <Shield className="w-4 h-4 mr-1" /> 92% Diagnostic Accuracy
                </Badge>
                <Badge className="bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
                  <Lock className="w-4 h-4 mr-1" /> HIPAA Compliant
                </Badge>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-genrivia-blue to-genrivia-teal border-2 border-genrivia-dark"
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  <span className="text-white font-medium">250+</span> healthcare professionals already on the waitlist
                </p>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto animate-breathe">
                <div className="absolute inset-0 bg-gradient-to-r from-genrivia-blue/10 to-genrivia-teal/10 rounded-3xl blur-xl"></div>
                <div className="relative glass-card rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-8 h-8 overflow-hidden rounded-full">
                        <Image
                          src="/images/genrivia-logo.png"
                          alt="Genrivia Logo"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-lg font-medium gradient-text">Genrivia</span>
                    </div>
                    <Badge className="bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20">
                      AI Assistant
                    </Badge>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-300">
                        I've been experiencing headaches and fatigue for the past week. What could be causing this?
                      </p>
                    </div>

                    <div className="bg-genrivia-blue/5 border border-genrivia-blue/10 rounded-lg p-3 ml-auto max-w-[80%]">
                      <p className="text-sm">
                        I'm sorry to hear you're not feeling well. Headaches and fatigue can have many causes,
                        including:
                      </p>
                      <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-gray-300">
                        <li>Dehydration</li>
                        <li>Stress or anxiety</li>
                        <li>Poor sleep quality</li>
                        <li>Viral infections</li>
                      </ul>
                      <p className="text-sm mt-2">
                        Would you like me to ask some follow-up questions to help narrow down the possible causes?
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask Genrivia anything..."
                      className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-full py-3 px-4 text-sm focus:outline-none focus:border-genrivia-blue"
                    />
                    <Button
                      size="sm"
                      className="absolute right-1 top-1 bg-genrivia-blue hover:bg-genrivia-blue/90 rounded-full h-8"
                    >
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 animate-float">
                <Image
                  src="/images/genrivia-logo.png"
                  alt="Genrivia AI Robot"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <StatsSection />
        </div>
      </section>

      {/* Core Features Section - Bento Grid */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20 py-1.5 px-4 rounded-full">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Healthcare Made Simple</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Genrivia combines cutting-edge AI technology with medical expertise to deliver personalized healthcare
              guidance with 92% accuracy, making complex health decisions easier for everyone.
            </p>
          </div>

          <BentoGrid>
            <BentoItem
              title="AI-Powered Symptom Checker"
              description="Analyze symptoms and provide potential diagnoses with detailed explanations and next steps."
              icon={<Activity className="text-genrivia-blue" size={24} />}
              accentColor="blue"
              size="large"
              image="/placeholder.svg?height=400&width=600"
              imagePosition="background"
              onClick={() => openFeatureModal(featuresData[0])}
            />

            <BentoItem
              title="Personalized Health Monitoring"
              description="Track health metrics and receive AI-driven insights and recommendations for improvement."
              icon={<HeartPulse className="text-genrivia-teal" size={24} />}
              accentColor="teal"
              onClick={() => openFeatureModal(featuresData[1])}
            />

            <BentoItem
              title="Medication Management"
              description="Monitor medications, get reminders, and receive alerts about potential interactions."
              icon={<Pill className="text-genrivia-blue" size={24} />}
              accentColor="blue"
              onClick={() => openFeatureModal(featuresData[2])}
            />

            <BentoItem
              title="Skin Condition Analysis"
              description="Upload images for AI-powered analysis of skin conditions with care recommendations."
              icon={<Eye className="text-genrivia-teal" size={24} />}
              accentColor="teal"
              image="/placeholder.svg?height=200&width=300"
              imagePosition="right"
              onClick={() => openFeatureModal(featuresData[3])}
            />

            <BentoItem
              title="AI-Powered Nutrition Planner"
              description="Get personalized nutrition plans based on health goals, preferences, and medical conditions."
              icon={<FileText className="text-genrivia-blue" size={24} />}
              accentColor="blue"
              image="/placeholder.svg?height=200&width=300"
              imagePosition="bottom"
              onClick={() => openFeatureModal(featuresData[4])}
            />

            <BentoItem
              title="Health Knowledge Management"
              description="Access a vast database of medical information, research, and best practices through natural conversation."
              icon={<Brain className="text-genrivia-teal" size={24} />}
              accentColor="teal"
              onClick={() => openFeatureModal(featuresData[5])}
            />
          </BentoGrid>

          <div className="mt-12 text-center">
            <Button className="bg-genrivia-blue hover:bg-genrivia-blue/90">
              Explore All Features
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
              Beta Program
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Among the First to Experience Genrivia</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our exclusive beta program and help shape the future of AI-powered healthcare that's already
              achieving 92% diagnostic accuracy in clinical testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Apply for Beta",
                description:
                  "Fill out a simple application form to express your interest in Genrivia's early access program.",
                icon: <FileText className="text-genrivia-blue" size={32} />,
              },
              {
                step: 2,
                title: "Get Early Invite",
                description:
                  "Selected applicants will receive an exclusive invitation to join our beta testing community.",
                icon: <MessageSquare className="text-genrivia-teal" size={32} />,
              },
              {
                step: 3,
                title: "Experience Genrivia's AI Power",
                description: "Gain immediate access to all beta features and help shape the future of healthcare AI.",
                icon: <Zap className="text-genrivia-blue" size={32} />,
              },
            ].map((item, index) => (
              <Card key={index} className="glass-card overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-genrivia-blue/10 to-genrivia-teal/10 rounded-bl-3xl"></div>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:text-genrivia-blue transition-colors">
                    {item.icon}
                  </div>
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center text-sm font-medium text-genrivia-blue border border-genrivia-blue/20">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-genrivia-blue hover:bg-genrivia-blue/90">
              Apply for Early Access
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20 py-1.5 px-4 rounded-full">
              Demo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Future of Healthcare AI Today</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See Genrivia in action and discover how it's transforming healthcare communication and decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center bg-genrivia-dark/80 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-genrivia-blue/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-genrivia-blue/30 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-genrivia-blue flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white ml-1"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-300">Click to watch demo</p>
                  </div>

                  <Image
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Genrivia Demo Video Thumbnail"
                    width={1280}
                    height={720}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6">
                <div className="glass-card rounded-lg p-4 shadow-lg max-w-xs">
                  <div className="flex items-start space-x-3">
                    <div className="relative w-8 h-8 overflow-hidden rounded-full flex-shrink-0">
                      <Image
                        src="/images/genrivia-logo.png"
                        alt="Genrivia Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">
                        "Genrivia analyzed my symptoms and correctly suggested I should get tested for vitamin D
                        deficiency, which my doctor confirmed."
                      </p>
                      <p className="text-xs text-gray-400 mt-2">— Sarah K., Early Beta User</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">See How Genrivia Works</h3>
              <p className="text-gray-300 mb-6">
                Watch our demo to see how Genrivia's AI-powered healthcare companion can help you:
              </p>
              <ul className="space-y-3">
                {[
                  "Get accurate symptom analysis with 92% diagnostic accuracy",
                  "Receive personalized health recommendations",
                  "Track medications and health metrics effortlessly",
                  "Access reliable medical information in simple language",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-genrivia-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-genrivia-blue hover:bg-genrivia-blue/90">
                Watch Full Demo
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Are Saying</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear from healthcare professionals and patients who are already experiencing the benefits of Genrivia's
              AI-powered healthcare companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                className={index % 2 === 0 ? "md:mt-8" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Scenarios */}
      <section id="use-cases" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20 py-1.5 px-4 rounded-full">
              Use Cases
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tailored for Everyone in the Healthcare Journey</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Whether you're a patient seeking clarity, a doctor streamlining your practice, or simply someone who wants
              to take control of their health, Genrivia adapts to your unique needs.
            </p>
          </div>

          <Tabs defaultValue="patients" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent mb-8">
              {[
                { value: "patients", label: "For Patients", icon: <User size={16} /> },
                { value: "doctors", label: "For Doctors", icon: <Stethoscope size={16} /> },
                { value: "health-concerned", label: "For Health-Conscious", icon: <HeartPulse size={16} /> },
                { value: "general", label: "For Everyone", icon: <Users size={16} /> },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-genrivia-blue data-[state=active]:text-white border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="patients" className="mt-0">
              <div className="glass-card rounded-xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Empowering Patient Self-Care</h3>
                    <p className="text-gray-300 mb-6">
                      Genrivia helps you understand your health, manage conditions, and make informed decisions with 92%
                      accuracy.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Get personalized health education in simple, jargon-free language",
                        "Receive accurate symptom assessments and appropriate next steps",
                        "Track medications and get timely reminders to stay on schedule",
                        "Monitor your health progress with easy-to-understand visualizations",
                        "Prepare for doctor visits with relevant questions and information",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={18} className="text-genrivia-teal mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-8 bg-genrivia-blue hover:bg-genrivia-blue/90">
                      Learn More
                      <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src="/placeholder.svg?height=500&width=500"
                        alt="Patient Use Case"
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 glass-card rounded-lg p-4 shadow-lg max-w-xs">
                      <p className="text-sm text-gray-300">
                        "Genrivia helped me understand my chronic condition and stay on track with my treatment plan
                        with remarkable accuracy."
                      </p>
                      <p className="text-xs text-gray-400 mt-2">— Lisa M., Patient</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Other tab contents would be similar */}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get answers to common questions about Genrivia and our early access program.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How can I get into the early access program?",
                  answer:
                    "You can apply for early access by filling out the application form on our website. We're selecting participants based on various factors including healthcare needs, geographic location, and use cases to ensure a diverse beta testing group.",
                },
                {
                  question: "What features will be available in beta?",
                  answer:
                    "Beta testers will have access to all core features including AI-powered symptom checking, personalized health monitoring, medication management, and medical knowledge retrieval. Some advanced features may be rolled out gradually during the beta period.",
                },
                {
                  question: "How accurate is Genrivia's AI?",
                  answer:
                    "Genrivia achieves 92% accuracy in diagnostic suggestions and health recommendations based on extensive clinical validation. Our AI models are continuously trained on diverse medical datasets and validated by healthcare professionals to ensure reliability across different health conditions and patient demographics.",
                },
                {
                  question: "Is Genrivia HIPAA-compliant during beta?",
                  answer:
                    "Yes, Genrivia is fully HIPAA-compliant even during the beta phase. We prioritize patient data security and privacy with enterprise-grade encryption and strict access controls.",
                },
                {
                  question: "How does Genrivia ensure data privacy?",
                  answer:
                    "Genrivia employs end-to-end encryption, secure data storage, and follows strict data minimization principles. We never sell user data and only use anonymized information for improving our AI models with explicit consent.",
                },
                {
                  question: "What happens after the beta program ends?",
                  answer:
                    "Beta participants will have the option to transition to a paid plan with special early adopter pricing and benefits. You'll be notified well in advance about the end of the beta period and available options.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-genrivia-blue/5 hover:no-underline bg-white/5 backdrop-blur-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-genrivia-dark/80 backdrop-blur-md text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Footer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Future of Healthcare Today</h2>
            <p className="text-gray-300 mb-8">
              Join our exclusive beta program to experience Genrivia's 92% accurate AI healthcare companion. We're
              making healthcare more accessible, understandable, and personalized for everyone.
            </p>
            <Button size="lg" className="bg-genrivia-blue hover:bg-genrivia-blue/90 text-white">
              Join the Waitlist Now
            </Button>
            <p className="text-gray-400 text-sm mt-4">
              Limited spots available. Be among the first to transform your healthcare experience.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Modal */}
      {selectedFeature && (
        <FeatureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} feature={selectedFeature} />
      )}
    </div>
  )
}

