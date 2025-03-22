"use client"

import React from "react"

import { Suspense } from "react"
import Banner from "@/components/banner"
import ProductsSection from "@/components/products-section"
import DragDropGame from "@/components/drag-drop-game"
import StemProjects from "@/components/stem-projects"
import Partners from "@/components/partners"
import ContactForm from "@/components/contact-form"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeToggle from "@/components/theme-toggle"
import { useLanguage } from "@/components/language-provider"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Xploria%20Logo%201-X90SJF1UV9HeShfTOmOOjY1GRoRv7C.png"
              alt="Xploria Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-primary">Xploria</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#products">Products</NavLink>
            <NavLink href="#stem">STEM</NavLink>
            <NavLink href="#partners">Partners</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <MobileMenu />
          </div>
        </div>
      </header>

      <Suspense fallback={<div className="h-[600px] flex items-center justify-center">Loading...</div>}>
        <Banner />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading...</div>}>
        <ProductsSection />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading...</div>}>
        <DragDropGame />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading...</div>}>
        <StemProjects />
      </Suspense>

      <Suspense fallback={<div className="h-[200px] flex items-center justify-center">Loading...</div>}>
        <Partners />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading...</div>}>
        <ContactForm />
      </Suspense>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Xploria. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-400 font-medium transition-colors duration-200 text-lg"
    >
      {children}
    </a>
  )
}

function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { t } = useLanguage()

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="p-2">
        {isOpen ? (
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
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
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
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 z-50">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a
              href="#home"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-400 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t("home")}
            </a>
            <a
              href="#products"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-400 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t("products")}
            </a>
            <a
              href="#stem"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-400 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t("stem")}
            </a>
            <a
              href="#partners"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-400 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t("partners")}
            </a>
            <a
              href="#contact"
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-400 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {t("contact")}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

