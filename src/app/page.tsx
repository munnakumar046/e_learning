import { NavigationMenuDemo } from "@/components/Navbar";
import Hero from "../components/Hero";
import ProductsSection from "../components/ProductsSection";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7f9]">
      {/* <Navbar /> */}
      <NavigationMenuDemo />

      <Hero />

      <div className="mx-auto flex max-width: 1440px; flex-col gap-6 px-6 py-8 lg:flex-row lg:px-10">
        <Sidebar />
        <ProductsSection />
      </div>
    </main>
  );
}
