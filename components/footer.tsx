import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_white-C9jHhiOa9F4hH3c46Cz8kBrw813J89.png"
                alt="StaffOnSite Logo"
                className="h-6 w-auto"
              />
              <span className="text-xl font-bold text-white">StaffOnSite</span>
            </Link>
            <p className="mb-4 max-w-xs">
              Connecting event organizers with qualified staff for seamless event experiences.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">For Event Organizers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Post an Event
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Browse Staff
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">For Staff</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Payment Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Staff Success Stories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} StaffOnSite. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="text-sm hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
