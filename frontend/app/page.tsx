import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSearchSection } from "@/components/hero-search-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function Home() {
  //const resolvedSearchParams = await Promise.resolve(searchParams)

  const session = await auth()
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar session={session}/>
      <main className="flex-1">
        <HeroSearchSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
