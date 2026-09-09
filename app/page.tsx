import Catalog from "@/components/Catalog";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Stack from "@/components/Stack";
import Stages from "@/components/Stages";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stages />
        <Catalog />
        <Stack />
      </main>
      <Footer />
    </>
  );
}
