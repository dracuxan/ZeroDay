import { Button } from "@/components/ui/button"
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  link: string;
  code: string;
  previewImage: string;
  techStack: string[];
  buttonText?: string;
}
const projectsData: Project[] = [
  {
    title: "MicroEcom",
    description: "A lightweight and efficient e-commerce platform built with modern technologies, focusing on performance and user experience.",
    link: "https://microdocs.bynisarg.in/",
    code: "https://github.com/dracuxan/MicroEcom",
    previewImage: "/images/microecom.jpeg",
    techStack: ["go", "Makefile", "swagger", "docker"],
    buttonText: "Docs"
  },
  {
    title: "nix-dots",
    description: "Collection of dot files for my NixOS configurations",
    link: "/blogs/nix-dots",
    code: "https://github.com/dracuxan/nix-dots",
    previewImage: "/images/rice_v_f.png",
    techStack: ["NixOS", "Nix", "Lua", "Python", "Makefile"],
  },
  {
    title: "GoGrapical",
    description: " A Joblisting API built to show GraphQL implementation using Go and MongoDB.",
    link: "/blogs/go-graphical",
    code: "https://github.com/dracuxan/GoGraphical",
    previewImage: "/images/go_graphical.png",
    techStack: ["Go", "MongoDB", "Yaml", "graphqls", "99designs"],
  },
  {
    title: "GoScout",
    description: "GoScout is a powerful and efficient file search tool written in Go. It searchs for specific words across all files in a given directory, regardless of file type.",
    link: "/blogs/go-scout",
    code: "https://github.com/dracuxan/GoScout",
    previewImage: "/images/go_scout.png",
    techStack: ["go", "Makefile"],
  },
];

const Projects = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">[Projects]</h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        {projectsData?.map((item, index) => (
          <div key={index} className="flex flex-col border border-gray-100">
            <img src={item.previewImage} className="w-full h-full"></img>
            <div className="flex flex-col gap-3 p-4">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">{item.description}</p>
              <div className="flex gap-1 flex-wrap">
                {item.techStack.map((tech, index) => (
                  <div key={index} className="flex border border-black rounded-md px-2 py-1 bg-black text-white text-xs dark:text-black dark:bg-white">{tech}</div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Link href={item.link} {...(item.buttonText === "Docs" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <Button variant="default">{item.buttonText || "Read More"}</Button>
                </Link>
                <Link href={item.code} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Source Code</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
