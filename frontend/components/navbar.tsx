"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10)
    })
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-black shadow-md" : "bg-black"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_white-C9jHhiOa9F4hH3c46Cz8kBrw813J89.png"
              alt="StaffOnSite Logo"
              className="h-6 w-auto"
            />
            <span className="text-xl font-bold text-white"></span>
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="#features" className="text-sm font-medium text-white hover:text-primary">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-white hover:text-primary">
            How It Works
          </Link>
          <div>
          <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-gray-100">
            <Link href="/login"><p><strong>Login</strong></p></Link>
          </Button>
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden border-white text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black text-white">
            <nav className="flex flex-col gap-4 pt-8">
              <Link href="#features" className="text-lg font-medium hover:text-primary">
                Features
              </Link>
              <Link href="#how-it-works" className="text-lg font-medium hover:text-primary">
                How It Works
              </Link>
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link href="/login"><p><strong>Login</strong></p></Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
