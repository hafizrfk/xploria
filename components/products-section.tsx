"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef } from "react"

const products = [
  {
    id: 1,
    name: {
      en: "Science Kit",
      id: "Kit Sains",
    },
    description: {
      en: "Explore chemistry, physics, and biology with 20+ experiments!",
      id: "Jelajahi kimia, fisika, dan biologi dengan 20+ eksperimen!",
    },
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "bg-blue-100",
    icon: (
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
        className="lucide lucide-flask-conical"
      >
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  {
    id: 2,
    name: {
      en: "Coding Robot",
      id: "Robot Coding",
    },
    description: {
      en: "Learn programming basics with our friendly robot companion!",
      id: "Pelajari dasar-dasar pemrograman dengan robot ramah kami!",
    },
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "bg-green-100",
    icon: (
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
        className="lucide lucide-bot"
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
  },
  {
    id: 3,
    name: {
      en: "Math Puzzle Box",
      id: "Kotak Puzzle Matematika",
    },
    description: {
      en: "Make math fun with colorful puzzles and brain teasers!",
      id: "Buat matematika menyenangkan dengan teka-teki berwarna dan asah otak!",
    },
    image:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "bg-yellow-100",
    icon: (
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
        className="lucide lucide-puzzle"
      >
        <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.743-.95l.235-1.881c.059-.47-.177-.94-.587-1.174a1.05 1.05 0 0 0-1.174.117l-.763.764c-.236.235-.553.353-.871.353H9.232c-.318 0-.636-.118-.871-.353l-.762-.764a1.05 1.05 0 0 0-1.175-.117c-.41.235-.646.705-.587 1.174l.235 1.88c.059.471-.273.882-.743.951a.98.98 0 0 1-.837-.276L2.87 13.704A2.41 2.41 0 0 1 2.165 12c0-.617.236-1.234.706-1.704L4.44 8.728c.23-.23.337-.556.289-.878L4.5 6.062c-.07-.47.058-.94.41-1.234.352-.293.822-.41 1.292-.293l1.85.412a.97.97 0 0 0 .968-.235l1.086-1.086A.97.97 0 0 1 10.341 3h2.318c.318 0 .636.117.87.352l1.086 1.086a.97.97 0 0 0 .969.235l1.85-.412c.47-.117.94 0 1.292.293.352.294.48.764.41 1.234l-.229.788Z" />
      </svg>
    ),
  },
  {
    id: 4,
    name: {
      en: "Nature Explorer Kit",
      id: "Kit Penjelajah Alam",
    },
    description: {
      en: "Discover plants, animals, and ecosystems with hands-on tools!",
      id: "Temukan tumbuhan, hewan, dan ekosistem dengan alat praktis!",
    },
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "bg-red-100",
    icon: (
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
        className="lucide lucide-mountain"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
]

export default function ProductsSection() {
  const { language, t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{t("exploreProducts")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hidden md:block"
          >
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
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div
            ref={containerRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className={`flex-shrink-0 w-72 rounded-xl overflow-hidden shadow-lg snap-start ${product.color} dark:bg-gray-800 dark:bg-opacity-90`}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mb-4 text-primary">
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{product.name[language]}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description[language]}</p>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name[language]}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    {language === "en" ? "Learn More" : "Pelajari Lebih Lanjut"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hidden md:block"
          >
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
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

