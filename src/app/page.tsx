import { Meteors } from "@/components/magicui/meteors";
import Intro from "@/components/Intro";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import CustomDock from "@/components/CustomDock";
import About from "@/components/About";


export default function Home() {
  return (
    <div className="relative md:w-6/12 sm:w-7/12 mx-auto items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full overflow-hidden">
        <Meteors />
        <Intro />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <CustomDock />
      </main>
    </div>
  );
}
