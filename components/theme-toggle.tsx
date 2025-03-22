"use client"

import { useEffect, useState } from "react"
import { useTheme } from "./theme-provider"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="theme-toggle scale-75 transform-gpu">
      <input
        type="checkbox"
        id="toggle_checkbox"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <label htmlFor="toggle_checkbox">
        <div id="star">
          <div id="star-1" className="star">
            ★
          </div>
          <div id="star-2" className="star">
            ★
          </div>
        </div>
        <div id="moon"></div>
      </label>

      <style jsx>{`
        * {
          user-select: none;  
        }

        .theme-toggle {
          position: relative;
          width: 116px;
          height: 56px;
        }

        #toggle_checkbox {
          display: none;
        }

        label {
          display: block;
          position: relative;
          width: 116px;
          height: 56px;
          background-color: #77b5fe;
          border-radius: 56px;
          cursor: pointer;
          transition: 0.3s ease background-color;
          overflow: hidden;
        }

        #star {
          position: absolute;
          top: 13px;
          left: 13px;
          width: 30px;
          height: 30px;
          background-color: #fafd0f;
          transform: scale(1);
          border-radius: 50%;
          transition: 0.3s ease top, 0.3s ease left, 0.3s ease transform, 0.3s ease background-color;
          z-index: 1;
        }

        #star-1 {
          position: relative;
        }

        #star-2 {
          position: absolute;
          transform: rotateZ(36deg);
        }

        .star {
          top: 0;
          left: -7px;
          font-size: 54px;
          line-height: 28px;
          color: #fafd0f;
          transition: 0.3s ease color;
        }

        #moon {
          position: absolute;
          bottom: -52px;
          right: 8px;
          width: 40px;
          height: 40px;
          background-color: #fff;
          border-radius: 50%;
          transition: 0.3s ease bottom;
        }

        #moon:before {
          content: "";
          position: absolute;
          top: -12px;
          left: -17px;
          width: 40px;
          height: 40px;
          background-color: #03a9f4;
          border-radius: 50%;
          transition: 0.3s ease background-color;
        }

        #toggle_checkbox:checked + label {
          background-color: #000;
        }

        #toggle_checkbox:checked + label #star {
          top: 3px;
          left: 64px;
          transform: scale(0.3);
          background-color: yellow;
        }

        #toggle_checkbox:checked + label .star {
          color: yellow;
        }

        #toggle_checkbox:checked + label #moon {
          bottom: 8px;
        }

        #toggle_checkbox:checked + label #moon:before {
          background-color: #000;
        }
      `}</style>
    </div>
  )
}

