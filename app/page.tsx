import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGallery from "./components/ProductGallery";
import JewelryShowcase from "./components/JewelryShowcase";
import CraftsmanshipSection from "./components/CraftsmanshipSection";
import NuestrasSedes from "./components/NuestrasSedes";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] noise-overlay">
      <Navbar />
      <Hero />
      <ProductGallery />
      <JewelryShowcase />
      <CraftsmanshipSection />
      <NuestrasSedes />
      <Newsletter />
      <Footer />
    </main>
  );
}

