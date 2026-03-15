"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = ["Todas", "Anillos", "Collares", "Pendientes", "Pulseras"];

const products = [
  {
    id: 1,
    name: "Lumière Solitaire",
    category: "Anillos",
    price: "$48,500",
    material: "Oro Rosa 18K · D VVS1",
    tag: "Mas Vendido",
    gradient: "from-[#1a1208] via-[#2a1e0a] to-[#0d0d0d]",
    accentGlow: "rgba(201,168,76,0.15)",
  },
  {
    id: 2,
    name: "Étoile Pendant",
    category: "Collares",
    price: "$12,800",
    material: "Platino · Zafiro",
    tag: "Nuevo",
    gradient: "from-[#080d1a] via-[#0a1222] to-[#0d0d0d]",
    accentGlow: "rgba(80,120,201,0.12)",
  },
  {
    id: 3,
    name: "Cascade Drops",
    category: "Pendientes",
    price: "$8,200",
    material: "Oro Amarillo 18K · Esmeralda",
    tag: null,
    gradient: "from-[#071308] via-[#0b1a0c] to-[#0d0d0d]",
    accentGlow: "rgba(40,160,80,0.1)",
  },
  {
    id: 4,
    name: "Eternity Band",
    category: "Anillos",
    price: "$22,000",
    material: "Platino · 3.0 ct Total",
    tag: "Edicion Limitada",
    gradient: "from-[#141414] via-[#1c1c1c] to-[#0d0d0d]",
    accentGlow: "rgba(220,220,220,0.12)",
  },
  {
    id: 5,
    name: "Serpentine Cuff",
    category: "Pulseras",
    price: "$31,000",
    material: "Oro Blanco 18K · Rubies",
    tag: null,
    gradient: "from-[#1a0808] via-[#1e0b0b] to-[#0d0d0d]",
    accentGlow: "rgba(201,60,60,0.12)",
  },
  {
    id: 6,
    name: "Aurora Cluster",
    category: "Pendientes",
    price: "$15,400",
    material: "Oro 18K · Multi piedra",
    tag: "Nuevo",
    gradient: "from-[#100d1a] via-[#16102a] to-[#0d0d0d]",
    accentGlow: "rgba(140,80,220,0.12)",
  },
];

function ProductCard({
  product,
  index,
  inView,
}: {
  product: (typeof products)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer"
    >
      {/* Card */}
      <div className="relative overflow-hidden border border-[#C9A84C]/10 hover:border-[#C9A84C]/35 transition-colors duration-500">
        {/* Image area */}
        <div className={`relative h-72 bg-gradient-to-br ${product.gradient} overflow-hidden`}>
          {/* Glow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${product.accentGlow} 0%, transparent 70%)`,
            }}
          />

          {/* Decorative ring shape placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: hovered ? 360 : 0 }}
              transition={{ duration: 8, ease: "linear", repeat: hovered ? Infinity : 0 }}
              className="relative"
            >
              <div className="w-28 h-28 rounded-full border-2 border-[#C9A84C]/30 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-[#C9A84C]/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E8C97A] opacity-80" />
                </div>
              </div>
              {/* Orbit dot */}
              <div
                className="absolute w-2 h-2 rounded-full bg-[#C9A84C] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ boxShadow: "0 0 8px rgba(201,168,76,0.8)" }}
              />
            </motion.div>
          </div>

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4">
              <span
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[9px] tracking-[0.35em] uppercase px-3 py-1.5 bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C]"
              >
                {product.tag}
              </span>
            </div>
          )}

          {/* Hover overlay action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center"
          >
            <span
              style={{ fontFamily: "var(--font-body)" }}
              className="text-[10px] tracking-[0.4em] uppercase border border-[#C9A84C] text-[#C9A84C] px-6 py-3 hover:bg-[#C9A84C]/10 transition-colors"
            >
              Ver Detalles
            </span>
          </motion.div>
        </div>

        {/* Info area */}
        <div className="p-5 bg-[#080808]">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-xl text-[#f5f0e8] group-hover:text-[#C9A84C] transition-colors duration-300"
              >
                {product.name}
              </h3>
              <p
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/35 mt-0.5"
              >
                {product.material}
              </p>
            </div>
            <span
              style={{ fontFamily: "var(--font-heading)" }}
              className="text-xl text-gold-gradient"
            >
              {product.price}
            </span>
          </div>

          {/* Bottom gold line */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 h-px bg-gradient-to-r from-[#C9A84C] to-transparent origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filtered =
    activeCategory === "Todas"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="collections" ref={ref} className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="text-[10px] tracking-[0.5em] uppercase text-[#C9A84C] mb-4"
            >
              Colecciones Curadas
            </p>
            <h2
              style={{ fontFamily: "var(--font-heading)" }}
              className="text-5xl md:text-6xl font-light text-white"
            >
              Obras Maestras
              <br />
              <span className="italic text-[#f5f0e8]/60">en cada detalle</span>
            </h2>
          </div>
          <a
            href="#"
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] border-b border-[#C9A84C]/40 pb-1 hover:border-[#C9A84C] transition-colors"
          >
            Ver Todas las Piezas →
          </a>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex gap-2 flex-wrap mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ fontFamily: "var(--font-body)" }}
              className={`px-5 py-2 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#C9A84C] text-black"
                  : "border border-[#C9A84C]/20 text-[#f5f0e8]/50 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
