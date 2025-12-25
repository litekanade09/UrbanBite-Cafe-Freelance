"use client"

import { useState, useEffect } from "react"
import { Menu, X, Coffee } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Track active section
      const sections = ["home", "about", "menu", "gallery", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? "bg-[#2D241E] shadow-2xl py-2 backdrop-blur-lg" 
          : "bg-[#3D3028]/90 py-4 backdrop-blur-sm"
      }`}
      style={{
        transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
        animation: 'slideDown 0.6s ease-out'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section - Animated on hover */}
          <a 
            href="#home" 
            className="flex items-center gap-2 text-xl sm:text-2xl font-serif font-bold text-[#F5F5F0] group transition-all duration-300 hover:scale-105"
          >
            <Coffee className="h-6 w-6 sm:h-7 sm:w-7 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-tight">UrbanBite Café</span>
          </a>

          {/* Desktop Navigation - Animated links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-110 ${
                  activeSection === link.href 
                    ? "text-[#D4AF37]" 
                    : "text-[#F5F5F0]/90 hover:text-[#D4AF37]"
                }`}
                style={{
                  animation: `fadeInDown 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                {link.label}
                {/* Active indicator */}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                    activeSection === link.href ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Animated */}
          <button
            className="md:hidden text-[#D4AF37] hover:bg-[#F5F5F0]/10 p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-8 h-8">
              <Menu 
                className={`absolute inset-0 h-8 w-8 transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`} 
              />
              <X 
                className={`absolute inset-0 h-8 w-8 transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Smooth slide animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 pb-6 border-t border-[#D4AF37]/20 pt-4">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-lg font-medium transition-all duration-300 py-2 px-4 rounded-lg hover:bg-[#F5F5F0]/10 hover:translate-x-2 ${
                  activeSection === link.href 
                    ? "text-[#D4AF37] bg-[#F5F5F0]/5" 
                    : "text-[#F5F5F0] hover:text-[#D4AF37]"
                }`}
                onClick={() => setIsOpen(false)}
                style={{
                  animation: isOpen ? `slideInLeft 0.4s ease-out ${index * 0.1}s backwards` : 'none'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  )
}