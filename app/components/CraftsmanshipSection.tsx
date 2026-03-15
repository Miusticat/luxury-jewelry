"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    icon: "◆",
    title: "Origen Etico",
    description: "Cada gema se obtiene de forma etica y esta certificada libre de conflicto. Nuestra cadena de suministro es trazable desde la mina hasta la maison.",
  },
  {
    icon: "✦",
    title: "Maestros Artesanos",
    description: "Cada pieza es elaborada a mano por nuestros maestros joyeros con mas de tres decadas de experiencia en alta joyeria.",
  },
  {
    icon: "⬡",
    title: "Garantia de Por Vida",
    description: "Nuestras piezas incluyen garantia vitalicia de elaboracion y servicio de limpieza sin costo, para siempre.",
  },
  {
    icon: "◇",
    title: "Servicio a Medida",
    description: "Encargue una pieza creada por completo para usted. Nuestro atelier de diseno hace realidad su vision con precision absoluta.",
  },
];

export default function CraftsmanshipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="craftsmanship"
      ref={ref}
      className="relative py-16 md:py-24 lg:py-36 overflow-hidden bg-[#050505]"
    >
      {/* Background texture lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-[#C9A84C]"
            style={{ top: `${(i + 1) * 8}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: large text block */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{ fontFamily: "var(--font-body)" }}
              className="text-[10px] tracking-[0.5em] uppercase text-[#C9A84C] mb-6"
            >
              Nuestra Filosofia
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              style={{ fontFamily: "var(--font-heading)" }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8"
            >
              Creado con
              <br />
              <span className="italic text-[#C9A84C]">obsesiva</span>
              <br />
              precision
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.3 }}
              className="w-20 h-px bg-gradient-to-r from-[#C9A84C] to-transparent mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ fontFamily: "var(--font-body)" }}
              className="text-[#f5f0e8]/45 text-sm leading-8 font-light max-w-md mb-12"
            >
              Desde 1987, Aurum es sinonimo de la busqueda de la perfeccion. Cada anillo, cada collar, cada gema se elige no solo por su brillo, sino por su capacidad de llevar una historia a traves de generaciones.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8"
            >
              {[
                { value: "38+", label: "Anos de Excelencia" },
                { value: "12K+", label: "Piezas Creadas" },
                { value: "94", label: "Paises Atendidos" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div
                    style={{ fontFamily: "var(--font-heading)" }}
                    className="text-4xl text-gold-gradient mb-1"
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{ fontFamily: "var(--font-body)" }}
                    className="text-[9px] tracking-[0.25em] uppercase text-[#f5f0e8]/35"
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: pillars */}
          <div className="flex flex-col gap-6 pt-8 lg:pt-20">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                className="group flex gap-6 p-6 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 bg-[#080808] hover:bg-[#0c0a05] transition-all duration-400"
              >
                <div
                  style={{ fontFamily: "var(--font-heading)" }}
                  className="text-[#C9A84C] text-xl mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  {pillar.icon}
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "var(--font-heading)" }}
                    className="text-lg text-[#f5f0e8] mb-2 group-hover:text-[#C9A84C] transition-colors duration-300"
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{ fontFamily: "var(--font-body)" }}
                    className="text-[#f5f0e8]/40 text-xs leading-6 font-light"
                  >
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
