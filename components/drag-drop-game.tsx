"use client"

import type React from "react"

import { useLanguage } from "./language-provider"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

type Shape = {
  id: string
  type: string
  color: string
}

type DropZone = {
  id: string
  type: string
  matched: boolean
}

export default function DragDropGame() {
  const { t } = useLanguage()
  const [shapes, setShapes] = useState<Shape[]>([])
  const [dropZones, setDropZones] = useState<DropZone[]>([])
  const [dragging, setDragging] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const dragConstraintsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize shapes and drop zones
    const shapeTypes = ["circle", "square", "triangle", "star"]
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"]

    const initialShapes = shapeTypes.map((type, index) => ({
      id: `shape-${index}`,
      type,
      color: colors[index],
    }))

    const initialDropZones = shapeTypes.map((type, index) => ({
      id: `zone-${index}`,
      type,
      matched: false,
    }))

    // Shuffle the shapes
    const shuffledShapes = [...initialShapes].sort(() => Math.random() - 0.5)

    setShapes(shuffledShapes)
    setDropZones(initialDropZones)
  }, [])

  const handleDragStart = (id: string) => {
    setDragging(id)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, shapeId: string) => {
    if (!dragging) return

    // Get the shape element
    const shapeElement = document.getElementById(shapeId)
    if (!shapeElement) return

    // Get shape position
    const shapeRect = shapeElement.getBoundingClientRect()
    const shapeCenterX = shapeRect.left + shapeRect.width / 2
    const shapeCenterY = shapeRect.top + shapeRect.height / 2

    // Check if shape is over any drop zone
    let matchedZone: DropZone | undefined

    dropZones.forEach((zone) => {
      if (zone.matched) return // Skip already matched zones

      const zoneElement = document.getElementById(zone.id)
      if (!zoneElement) return

      const zoneRect = zoneElement.getBoundingClientRect()

      // Check if shape center is inside zone
      if (
        shapeCenterX >= zoneRect.left &&
        shapeCenterX <= zoneRect.right &&
        shapeCenterY >= zoneRect.top &&
        shapeCenterY <= zoneRect.bottom
      ) {
        const shape = shapes.find((s) => s.id === shapeId)
        if (shape && shape.type === zone.type) {
          matchedZone = zone
        }
      }
    })

    if (matchedZone) {
      // Correct match
      setDropZones((prev) => prev.map((z) => (z.id === matchedZone?.id ? { ...z, matched: true } : z)))

      setShapes((prev) => prev.filter((s) => s.id !== shapeId))

      setScore((prev) => prev + 1)

      // Check if all shapes are matched
      if (score + 1 === dropZones.length) {
        setCompleted(true)
      }
    }

    setDragging(null)
  }

  const resetGame = () => {
    // Reset the game
    const shapeTypes = ["circle", "square", "triangle", "star"]
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"]

    const initialShapes = shapeTypes.map((type, index) => ({
      id: `shape-${index}`,
      type,
      color: colors[index],
    }))

    const initialDropZones = shapeTypes.map((type, index) => ({
      id: `zone-${index}`,
      type,
      matched: false,
    }))

    // Shuffle the shapes
    const shuffledShapes = [...initialShapes].sort(() => Math.random() - 0.5)

    setShapes(shuffledShapes)
    setDropZones(initialDropZones)
    setCompleted(false)
    setScore(0)
  }

  const renderShape = (type: string, color: string) => {
    switch (type) {
      case "circle":
        return <div className="w-16 h-16 rounded-full" style={{ backgroundColor: color }}></div>
      case "square":
        return <div className="w-16 h-16" style={{ backgroundColor: color }}></div>
      case "triangle":
        return (
          <div
            className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent"
            style={{ borderBottomColor: color }}
          ></div>
        )
      case "star":
        return (
          <div className="relative">
            <svg width="50" height="50" viewBox="0 0 24 24" fill={color}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const renderShadow = (type: string) => {
    switch (type) {
      case "circle":
        return <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      case "square":
        return <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600"></div>
      case "triangle":
        return (
          <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[52px] border-l-transparent border-r-transparent border-b-gray-300 dark:border-b-gray-600"></div>
        )
      case "star":
        return (
          <div className="relative">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="#D1D5DB" className="dark:fill-gray-600">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="drag-drop" className="py-16 bg-gradient-to-r from-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t("dragDropTitle")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t("dragDropInstructions")}</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {completed ? (
            <div className="text-center py-10">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600 dark:text-green-300"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {t("language") === "en" ? "Great job!" : "Kerja bagus!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t("language") === "en"
                    ? "You matched all the shapes correctly!"
                    : "Kamu mencocokkan semua bentuk dengan benar!"}
                </p>
                <Button onClick={resetGame} className="bg-primary hover:bg-primary/90 text-white">
                  {t("language") === "en" ? "Play Again" : "Main Lagi"}
                </Button>
              </motion.div>
            </div>
          ) : (
            <div
              ref={dragConstraintsRef}
              className="relative flex flex-col md:flex-row gap-8 items-center justify-center"
            >
              <div className="flex flex-wrap gap-6 justify-center">
                {shapes.map((shape) => (
                  <motion.div
                    id={shape.id}
                    key={shape.id}
                    className="cursor-grab active:cursor-grabbing touch-none"
                    drag
                    dragConstraints={dragConstraintsRef}
                    onDragStart={() => handleDragStart(shape.id)}
                    onDragEnd={(e) => handleDragEnd(e, shape.id)}
                    whileDrag={{ scale: 1.1, zIndex: 10 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {renderShape(shape.type, shape.color)}
                  </motion.div>
                ))}
              </div>

              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 mx-4 hidden md:block"></div>
              <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-4 md:hidden"></div>

              <div className="grid grid-cols-2 gap-6">
                {dropZones.map((zone) => (
                  <motion.div
                    id={zone.id}
                    key={zone.id}
                    className={`w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center ${
                      zone.matched
                        ? "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/30"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {zone.matched ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
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
                          className="text-green-500 dark:text-green-300"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </motion.div>
                    ) : (
                      renderShadow(zone.type)
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Button({
  children,
  onClick,
  className,
}: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors ${
        className || ""
      }`}
    >
      {children}
    </button>
  )
}

