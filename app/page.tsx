import Catalog from "@/components/Catalog";
import Curated from "@/components/Curated";
import FieldTrack from "@/components/FieldTrack";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import NotesTeaser from "@/components/NotesTeaser";
import Stack from "@/components/Stack";
import Stages from "@/components/Stages";

// Curated picks are admin-managed; refresh the prerendered page each minute.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stages />
        <Catalog />
        <FieldTrack />
        <Curated />
        <NotesTeaser />
        <Stack />
      </main>
      <Footer />
    </>
  );
}
