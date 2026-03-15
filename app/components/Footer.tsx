"use client";

export default function Footer() {
  return (
    <footer className="bg-[#030303] border-t border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center gap-4">
          <p
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-2xl font-light tracking-[0.26em] text-gold-gradient"
          >
            AURUM
          </p>

          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-[#C9A84C]/70"
          >
            Luxury Jewelry Experience
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[11px] leading-6 text-[#f5f0e8]/55 max-w-3xl"
          >
            Website developed by Miusticat. Created for the GTA WORLD project and presented as a portfolio showcase.
          </p>

          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[10px] tracking-[0.16em] text-[#f5f0e8]/30"
          >
            © 2026 AURUM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
