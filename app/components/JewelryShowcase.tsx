"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  defaultRingConfiguration,
  metalOptions,
  type MetalType,
  type RingConfiguration,
} from "./ring-config";

const metalLabels: Record<MetalType, string> = {
  "18K Rose Gold": "Oro Rosa 18K",
  "18K Yellow Gold": "Oro Amarillo 18K",
  "18K White Gold": "Oro Blanco 18K",
  Platinum: "Platino",
};

const JewelryViewer3D = dynamic(() => import("./JewelryViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
        <p
          style={{ fontFamily: "var(--font-body)" }}
          className="text-[#C9A84C]/50 text-xs tracking-widest uppercase"
        >
          Cargando Modelo 3D...
        </p>
      </div>
    </div>
  ),
});

export default function JewelryShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [config, setConfig] = useState<RingConfiguration>(defaultRingConfiguration);

  const estimatedPrice = useMemo(() => {
    const metalBase =
      config.metal === "Platinum"
        ? 14200
        : config.metal === "18K White Gold"
          ? 13300
          : config.metal === "18K Yellow Gold"
            ? 11800
            : 12400;
    return metalBase + 32000;
  }, [config.metal]);

  const updateMetal = (metal: RingConfiguration["metal"]) => {
    setConfig((prev) => ({ ...prev, metal }));
  };

  const updateEngraving = (engraving: string) => {
    setConfig((prev) => ({ ...prev, engraving: engraving.toUpperCase().slice(0, 14) }));
  };

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0803] to-[#050505]"
    >
      {/* Section glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C9A84C] mb-4"
          >
            Vitrina 3D Interactiva
          </p>
          <h2
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-5xl md:text-6xl font-light text-white mb-4"
          >
            El Solitario Lumiere
          </h2>
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[#f5f0e8]/40 text-sm tracking-wide max-w-md mx-auto"
          >
            Gire, observe y enamorese. Cada faceta cuenta una historia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-sm overflow-hidden border border-[#C9A84C]/10 bg-[#080806]">
              {/* Viewer glow border */}
              <div
                className="absolute inset-0 rounded-sm pointer-events-none z-10"
                style={{
                  boxShadow: "inset 0 0 60px rgba(201,168,76,0.04)",
                }}
              />
              <div className="h-[300px] sm:h-[420px] lg:h-[520px]">
                <JewelryViewer3D config={config} />
              </div>
              {/* Corner decorations */}
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
                (pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-6 h-6 border-[#C9A84C]/50 ${
                      i < 2 ? "border-t" : "border-b"
                    } ${i % 2 === 0 ? "border-l" : "border-r"} z-10`}
                  />
                )
              )}
            </div>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="text-center text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]/40 mt-4"
            >
              Arrastre para girar · Deslice para acercar
            </p>
          </motion.div>

          {/* Spec panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-2"
              >
                Configurador Interactivo
              </p>
              <h3
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-4xl font-light text-white italic mb-4"
              >
                Anillo Diamante Lumiere
              </h3>
              <p
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[#f5f0e8]/50 text-sm leading-7 font-light"
              >
                Elija su metal y anada un grabado personal para previsualizar el anillo en el visor de estudio.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

            {/* Config controls */}
            <div className="grid grid-cols-1 gap-4">
              <label className="flex flex-col gap-2">
                <span
                  style={{ fontFamily: "var(--font-body)" }}
                  className="text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]/65"
                >
                  Grabado
                </span>
                <input
                  value={config.engraving}
                  maxLength={14}
                  onChange={(e) => updateEngraving(e.target.value)}
                  placeholder="LUMIERE"
                  className="bg-[#090909] border border-[#C9A84C]/20 px-4 py-3 text-[#f5f0e8] text-sm tracking-wider placeholder:text-[#f5f0e8]/25 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span
                  style={{ fontFamily: "var(--font-body)" }}
                  className="text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]/65"
                >
                  Metal
                </span>
                <select
                  value={config.metal}
                  onChange={(e) => updateMetal(e.target.value as RingConfiguration["metal"])}
                  className="bg-[#090909] border border-[#C9A84C]/20 px-4 py-3 text-[#f5f0e8] text-sm focus:outline-none focus:border-[#C9A84C]/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {metalOptions.map((option) => (
                    <option key={option} value={option}>
                      {metalLabels[option]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div>
                <p
                  style={{ fontFamily: "var(--font-body)" }}
                  className="text-[9px] tracking-[0.3em] uppercase text-[#f5f0e8]/30 mb-1"
                >
                  Desde
                </p>
                <p
                  style={{ fontFamily: "var(--font-heading)" }}
                  className="text-4xl text-gold-gradient"
                >
                  ${estimatedPrice.toLocaleString("en-US")}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(201,168,76,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-black text-[11px] tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Solicitar Ahora
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
