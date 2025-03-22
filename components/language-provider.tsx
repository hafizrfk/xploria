"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "id"

type Translations = {
  [key: string]: {
    en: string
    id: string
  }
}

const translations: Translations = {
  home: {
    en: "Home",
    id: "Beranda",
  },
  products: {
    en: "Products",
    id: "Produk",
  },
  stem: {
    en: "STEM Projects",
    id: "Proyek STEM",
  },
  partners: {
    en: "Our Partners",
    id: "Mitra Kami",
  },
  contact: {
    en: "Contact Us",
    id: "Hubungi Kami",
  },
  startLearning: {
    en: "Start Learning Now!",
    id: "Mulai Belajar Sekarang!",
  },
  exploreProducts: {
    en: "Explore Our Products",
    id: "Jelajahi Produk Kami",
  },
  dragDropTitle: {
    en: "Fun Learning with Drag & Drop!",
    id: "Belajar Menyenangkan dengan Seret & Lepas!",
  },
  dragDropInstructions: {
    en: "Match the shapes with their correct shadows!",
    id: "Cocokkan bentuk dengan bayangan yang benar!",
  },
  stemTitle: {
    en: "Discover STEM Projects",
    id: "Temukan Proyek STEM",
  },
  science: {
    en: "Science",
    id: "Sains",
  },
  technology: {
    en: "Technology",
    id: "Teknologi",
  },
  engineering: {
    en: "Engineering",
    id: "Teknik",
  },
  math: {
    en: "Mathematics",
    id: "Matematika",
  },
  scienceDesc: {
    en: "Explore the wonders of science through fun experiments!",
    id: "Jelajahi keajaiban sains melalui eksperimen yang menyenangkan!",
  },
  techDesc: {
    en: "Learn coding and digital skills through interactive games!",
    id: "Pelajari coding dan keterampilan digital melalui permainan interaktif!",
  },
  engineeringDesc: {
    en: "Build amazing structures and solve engineering challenges!",
    id: "Bangun struktur menakjubkan dan selesaikan tantangan teknik!",
  },
  mathDesc: {
    en: "Make math fun with puzzles and interactive problems!",
    id: "Buat matematika menyenangkan dengan teka-teki dan masalah interaktif!",
  },
  partnersTitle: {
    en: "Our Amazing Partners",
    id: "Mitra Luar Biasa Kami",
  },
  contactTitle: {
    en: "Let's Chat!",
    id: "Mari Mengobrol!",
  },
  contactDesc: {
    en: "Have questions or want to learn more? Send us a message!",
    id: "Punya pertanyaan atau ingin tahu lebih banyak? Kirim pesan kepada kami!",
  },
  name: {
    en: "Name",
    id: "Nama",
  },
  email: {
    en: "Email",
    id: "Email",
  },
  message: {
    en: "Message",
    id: "Pesan",
  },
  send: {
    en: "Send Message",
    id: "Kirim Pesan",
  },
  bannerTitle: {
    en: "Fun Learning Adventures for Curious Minds!",
    id: "Petualangan Belajar Menyenangkan untuk Pikiran yang Ingin Tahu!",
  },
  bannerSubtitle: {
    en: "Discover interactive STEM activities that make learning exciting",
    id: "Temukan aktivitas STEM interaktif yang membuat belajar menyenangkan",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

