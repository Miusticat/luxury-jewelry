"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { STORE_LOCATIONS } from "./gta-stores";

// Loaded client-side only — Leaflet requires window
const GTAVMap = dynamic(() => import("./GTAVMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
        <p
          style={{ fontFamily: "var(--font-body)" }}
          className="text-[#C9A84C]/50 text-[9px] tracking-[0.4em] uppercase"
        >
          Cargando mapa...
        </p>
      </div>
    </div>
  ),
});

export default function NuestrasSedes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStore, setActiveStore] = useState<number | null>(null);
  const [activeMapStoreId, setActiveMapStoreId] = useState<number>(STORE_LOCATIONS[0]?.id ?? 1);

  return (
    <section
      id="sedes"
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#050505]"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#C9A84C] mb-5"
          >
            Los Santos · GTA V
          </p>
          <h2
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-5xl md:text-6xl font-light text-white mb-5"
          >
            Nuestras{" "}
            <span className="italic text-[#C9A84C]">Sedes</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent mx-auto mb-6"
          />
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[#f5f0e8]/45 text-sm leading-7 max-w-lg mx-auto"
          >
            Dos sedes de alta joyeria en zonas iconicas de Los Santos,
            disponibles exclusivamente mediante cita privada.
          </p>
        </motion.div>

        {/* ── Interactive GTA V Map ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          {/* Map label row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" style={{ boxShadow: "0 0 8px rgba(201,168,76,0.7)" }} />
              <p
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[9px] tracking-[0.4em] uppercase text-[#C9A84C]/70"
              >
                Mapa Interactivo · Los Santos
              </p>
            </div>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="hidden sm:block text-[9px] tracking-[0.22em] uppercase text-[#f5f0e8]/25"
            >
              Arrastre · Zoom · Marcadores
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
            {/* Map container */}
            <div className="relative border border-[#C9A84C]/15 overflow-hidden">
              {/* Corner accents */}
              {(["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"] as const).map(
                (pos, idx) => (
                  <div
                    key={idx}
                    className={`absolute ${pos} w-6 h-6 z-10 pointer-events-none ${
                      idx < 2 ? "border-t" : "border-b"
                    } ${idx % 2 === 0 ? "border-l" : "border-r"} border-[#C9A84C]/60`}
                  />
                )
              )}

              {/* Leaflet map */}
              <div className="h-[300px] sm:h-[400px] lg:h-[520px]">
                <GTAVMap activeStoreId={activeMapStoreId} onStoreSelect={setActiveMapStoreId} />
              </div>
            </div>

            {/* Side panel */}
            <aside className="border border-[#C9A84C]/15 bg-[#080808] p-5 md:p-6">
              <p
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[10px] tracking-[0.42em] uppercase text-[#C9A84C]/75 mb-3"
              >
                Sedes
              </p>
              <h3
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-2xl text-[#F5E9CB] font-light mb-5"
              >
                Navegacion Rapida
              </h3>
              <div className="h-px bg-gradient-to-r from-[#C9A84C]/40 to-transparent mb-5" />

              <div className="space-y-3">
                {STORE_LOCATIONS.map((store) => {
                  const active = activeMapStoreId === store.id;
                  return (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => setActiveMapStoreId(store.id)}
                      className={`w-full text-left border px-4 py-4 transition-all duration-300 ${
                        active
                          ? "border-[#C9A84C]/55 bg-[#12100a]"
                          : "border-[#C9A84C]/20 bg-[#0b0b0b] hover:border-[#C9A84C]/40"
                      }`}
                    >
                      <p
                        style={{ fontFamily: "var(--font-heading)" }}
                        className={`text-lg leading-none ${active ? "text-[#F5E9CB]" : "text-[#F5E9CB]/80"}`}
                      >
                        {store.name}
                      </p>
                      <p
                        style={{ fontFamily: "var(--font-body)" }}
                        className="text-[10px] mt-2 tracking-[0.12em] text-[#E5D4AF]/45"
                      >
                        {store.address}
                      </p>
                      <p
                        style={{ fontFamily: "var(--font-body)" }}
                        className={`text-[9px] uppercase tracking-[0.28em] mt-3 ${active ? "text-[#C9A84C]" : "text-[#C9A84C]/55"}`}
                      >
                        Ir a sede
                      </p>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>

          {/* Bottom caption */}
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-center text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]/35 mt-4"
          >
            Google Maps · Los Santos · San Andreas
          </p>
        </motion.div>
      </div>
    </section>
  );
}
