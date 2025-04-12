import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                On-Demand Event Staff When You Need It Most
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Connect with qualified event staff instantly. From bartenders to security, find the perfect team for
                your next event.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/hire">Hire Staff Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register-professional">Apply as Staff</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[250px] w-full overflow-hidden rounded-lg md:h-[300px]">
              <img
                src="/placeholder.svg?height=450&width=600"
                alt="Event staff working at a conference"
                className="object-cover"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
