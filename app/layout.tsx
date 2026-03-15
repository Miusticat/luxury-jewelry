import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AURUM — Alta Joyeria de Lujo",
  description: "Descubra piezas atemporales elaboradas con los diamantes y metales preciosos mas exquisitos. Donde el arte se encuentra con la elegancia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${cormorant.variable} ${raleway.variable} antialiased bg-[#050505] text-[#f5f0e8]`}
      >
        {children}
      </body>
    </html>
  );
}
