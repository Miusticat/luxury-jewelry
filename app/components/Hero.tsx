"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FloatingParticles from "./FloatingParticles";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  const headline = "DONDE EL ARTE VIVE ETERNO".split(" ");

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Ambient radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1/3"
          style={{
            background: "linear-gradient(to top, #050505, transparent)",
          }}
        />
      </div>

      {/* Floating gold particles */}
      <FloatingParticles />

      {/* Decorative horizontal lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ y, opacity }}
        className="absolute top-1/2 left-0 w-full h-px origin-left"
        aria-hidden
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto"
      >
        {/* Pre-headline */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ fontFamily: "var(--font-body)" }}
          className="text-[10px] text-[#C9A84C] uppercase mb-8 tracking-[0.5em]"
        >
          Est. 1987 · Maison de Alta Joyeria
        </motion.div>

        {/* Main headline */}
        <h1
          style={{ fontFamily: "var(--font-heading)" }}
          className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none mb-6 tracking-tight"
          aria-label="Donde el arte vive eterno"
        >
          {headline.map((word, wi) => (
            <span key={wi} className="inline-block mr-4 last:mr-0 overflow-hidden">
              {word.split("").map((char, ci) => (
                <motion.span
                  key={ci}
                  className="inline-block"
                  custom={wi * 5 + ci}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{ fontFamily: "var(--font-body)" }}
          className="text-[#f5f0e8]/50 text-sm md:text-base font-light tracking-[0.15em] max-w-lg mb-12"
        >
          Diamantes y metales preciosos elaborados a mano, esculpidos en joyas eternas para quienes abrazan lo extraordinario.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.a
            href="#collections"
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(201,168,76,0.25)" }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-black text-[11px] tracking-[0.35em] uppercase font-medium transition-all duration-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Explorar Coleccion
          </motion.a>
          <motion.a
            href="#showcase"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 border border-[#C9A84C]/40 text-[#C9A84C] text-[11px] tracking-[0.35em] uppercase hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Ver en 3D
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span
          style={{ fontFamily: "var(--font-body)" }}
          className="text-[9px] tracking-[0.4em] uppercase text-[#C9A84C]/50"
        >
          Deslizar
        </span>
        <div className="w-px h-12 overflow-hidden bg-[#C9A84C]/10 relative">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
