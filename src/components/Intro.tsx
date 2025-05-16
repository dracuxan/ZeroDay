"use client";
import Image from "next/image";
import { Meteors } from "@/components/magicui/meteors";

const Intro = () => {
  return (
    <div className="flex lg:gap-50 md:gap-4">
      <div className="flex flex-col gap-4 w-6/12">
        <h1 className="text-4xl font-bold">Nisarg Khodke</h1>
        <p className="text-base text-gray-700 dark:text-gray-300">
          Yet another CS undergrad trying to build yet another reliable software.</p>
        <br />
      </div>
      <div className="w-6/12 flex-1 md:w-full">
        <Image src="/images/dragon.png" alt="NK" width={160} height={160} className="rounded-full border border-gray-700 object-cover" />
      </div>
    </div >

  )
}

export default Intro
