import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Calendar, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | Genrivia",
  description: "Explore the latest insights on healthcare AI, medical technology, and wellness from Genrivia.",
}

// Mock blog data
const blogPosts = [
  {
    id: "1",
    title: "How AI is Transforming Diagnostic Accuracy in Healthcare",
    excerpt:
      "Explore how artificial intelligence is improving diagnostic accuracy and helping healthcare professionals make better decisions.",
    category: "AI in Healthcare",
    date: "Mar 15, 2023",
    author: "Dr. Sarah Chen",
    authorRole: "Chief Medical Officer",
    image: "/placeholder.svg?height=400&width=600",
    slug: "ai-transforming-diagnostic-accuracy",
  },
  {
    id: "2",
    title: "The Future of Personalized Medicine: AI-Driven Health Plans",
    excerpt:
      "Discover how AI is enabling truly personalized healthcare plans tailored to individual needs, preferences, and medical history.",
    category: "Personalized Medicine",
    date: "Feb 28, 2023",
    author: "Michael Rodriguez",
    authorRole: "CEO",
    image: "/placeholder.svg?height=400&width=600",
    slug: "future-personalized-medicine",
  },
  {
    id: "3",
    title: "Understanding the 92% Accuracy Benchmark in Healthcare AI",
    excerpt:
      "A deep dive into what accuracy means in healthcare AI, how it's measured, and why Genrivia's 92% benchmark matters.",
    category: "AI Technology",
    date: "Feb 10, 2023",
    author: "Dr. James Taylor",
    authorRole: "Chief AI Officer",
    image: "/placeholder.svg?height=400&width=600",
    slug: "understanding-accuracy-benchmark",
  },
  {
    id: "4",
    title: "Bridging the Healthcare Knowledge Gap with Conversational AI",
    excerpt: "How conversational AI is making complex medical information accessible and understandable for everyone.",
    category: "Healthcare Access",
    date: "Jan 22, 2023",
    author: "Lisa Kim",
    authorRole: "Chief Product Officer",
    image: "/placeholder.svg?height=400&width=600",
    slug: "bridging-healthcare-knowledge-gap",
  },
  {
    id: "5",
    title: "The Role of AI in Preventive Healthcare and Early Detection",
    excerpt:
      "Exploring how AI-powered health monitoring can identify potential health issues before they become serious problems.",
    category: "Preventive Healthcare",
    date: "Jan 5, 2023",
    author: "Dr. Sarah Chen",
    authorRole: "Chief Medical Officer",
    image: "/placeholder.svg?height=400&width=600",
    slug: "ai-preventive-healthcare",
  },
  {
    id: "6",
    title: "Ensuring Privacy and Security in Healthcare AI Applications",
    excerpt:
      "A comprehensive look at how Genrivia protects user data while providing personalized healthcare guidance.",
    category: "Privacy & Security",
    date: "Dec 18, 2022",
    author: "Michael Rodriguez",
    authorRole: "CEO",
    image: "/placeholder.svg?height=400&width=600",
    slug: "privacy-security-healthcare-ai",
  },
]

export default function BlogPage() {
  // Featured post is the first one
  const featuredPost = blogPosts[0]
  const regularPosts = blogPosts.slice(1)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20 py-1.5 px-4 rounded-full">
              Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Insights on <span className="gradient-text">Healthcare AI</span> and Wellness
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore the latest articles, research, and perspectives from the Genrivia team on healthcare technology
              and personal wellness.
            </p>
          </div>

          {/* Featured Post */}
          <div className="glass-card rounded-xl overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-genrivia-teal/10 text-genrivia-teal border-genrivia-teal/20">
                  {featuredPost.category}
                </Badge>
                <Link href={`/blog/${featuredPost.slug}`} className="group">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-genrivia-blue transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-gray-400 mb-6">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{featuredPost.date}</span>
                  <span className="mx-2">•</span>
                  <User className="w-4 h-4 mr-1" />
                  <span>{featuredPost.author}</span>
                </div>
                <Button asChild className="w-fit bg-genrivia-blue hover:bg-genrivia-blue/90">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read Article
                    <ChevronRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Regular Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="glass-card overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <Badge className="w-fit mb-4 bg-genrivia-blue/10 text-genrivia-blue border-genrivia-blue/20">
                    {post.category}
                  </Badge>
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-genrivia-blue transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <User className="w-3 h-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button asChild variant="ghost" className="p-0 h-auto text-sm font-medium group text-genrivia-blue">
                    <Link href={`/blog/${post.slug}`}>
                      Read More{" "}
                      <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="border-genrivia-teal text-genrivia-teal hover:bg-genrivia-teal/10">
              Load More Articles
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated with Our Newsletter</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to receive the latest insights on healthcare AI, medical technology, and wellness tips directly
              in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-genrivia-blue"
              />
              <Button className="bg-genrivia-blue hover:bg-genrivia-blue/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

