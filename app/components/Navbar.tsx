"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Colecciones", href: "#collections" },
  { label: "Savoir-Faire", href: "#craftsmanship" },
  { label: "Vitrina 3D", href: "#showcase" },
  { label: "Nuestras Sedes", href: "#sedes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-[#C9A84C]/20 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex flex-col leading-none"
            whileHover={{ scale: 1.02 }}
          >
            <span
              style={{ fontFamily: "var(--font-heading)" }}
              className="text-3xl font-light tracking-[0.3em] text-gold-gradient"
            >
              AURUM
            </span>
            <span
              style={{ fontFamily: "var(--font-body)" }}
              className="text-[9px] tracking-[0.5em] text-[#C9A84C]/60 uppercase mt-0.5 ml-0.5"
            >
              Alta Joyeria
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ fontFamily: "var(--font-body)" }}
                className="relative text-[11px] tracking-[0.25em] uppercase text-[#f5f0e8]/70 hover:text-[#C9A84C] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://discord.gg/Qvg6PUxtJg"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 border border-[#C9A84C]/50 hover:border-[#C9A84C] text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#C9A84C]/10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Reservar Asesoria
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-px bg-[#C9A84C]"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-4 h-px bg-[#C9A84C]"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-px bg-[#C9A84C]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-4xl font-light tracking-widest text-[#f5f0e8] hover:text-[#C9A84C] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
