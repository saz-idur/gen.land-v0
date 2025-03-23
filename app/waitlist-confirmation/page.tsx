import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function WaitlistConfirmation() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-20 h-20 rounded-full bg-genrivia-blue/20 flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-genrivia-blue" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">You're on the Waitlist!</h1>
      <p className="text-gray-300 text-center max-w-md mb-8">
        Thank you for your interest in Genrivia. We've added you to our waitlist and will notify you as soon as we have
        a spot available for you.
      </p>
      <div className="space-y-4 text-center">
        <p className="text-gray-400">While you wait, you can:</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            variant="outline"
            className="border-genrivia-blue text-genrivia-blue hover:bg-genrivia-blue/10"
          >
            <Link href="/about">Learn More About Genrivia</Link>
          </Button>
          <Button asChild className="bg-genrivia-blue hover:bg-genrivia-blue/90">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

