"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const DISCORD_URL = "https://discord.gg/Qvg6PUxtJg";

export default function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-40 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0803 0%, #050505 50%, #08060a 100%)",
      }}
    >
      {/* Large decorative circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none border border-[#C9A84C]/05"
        style={{ boxShadow: "0 0 200px rgba(201,168,76,0.04) inset" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none border border-[#C9A84C]/05"
      />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C9A84C] mb-6"
          >
            Acceso Privado
          </p>
          <h2
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight"
          >
            Entre al mundo
            <br />
            <span className="italic text-[#C9A84C]">de Aurum</span>
          </h2>
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[#f5f0e8]/40 text-sm leading-7 font-light mb-12 max-w-md mx-auto"
          >
            Unase a nuestro circulo privado para acceder antes que nadie a nuevas colecciones, eventos exclusivos y las historias detras de cada obra maestra.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <motion.a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(201,168,76,0.3)" }}
            whileTap={{ scale: 0.97 }}
            style={{ fontFamily: "var(--font-body)" }}
            className="px-12 py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-black text-[11px] tracking-[0.35em] uppercase font-medium transition-shadow"
          >
            Unirse
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
