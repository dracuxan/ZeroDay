import { Button } from "@/components/ui/button"
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  link: string;
  code: string;
  previewImage: string;
  techStack: string[];
}
const projectsData: Project[] = [
  {
    title: "FormVibe",
    description: "FormVibe is a platform that allows users to create and share forms with their friends.",
    link: "https://form-vibe.vercel.app/",
    code: "https://github.com/yatharth1706/FormVibe",
    previewImage: "/images/rice_v_f.png",
    techStack: ["Next.js", "React", "Appwrite", "TypeScript", "Tailwind CSS",],
  },
  {
    title: "EmojiGit CLI Tool",
    description: "EmojiGit is a CLI tool that allows you to add emojis to your git commits.",
    link: "https://github.com/yatharth1706/EmojiGit",
    code: "https://github.com/yatharth1706/EmojiGit",
    previewImage: "/images/rice_v_f.png",
    techStack: ["JavaScript", "Node.js", "Git", "Emoji", "Meow", "Inquirer"],
  },
  {
    title: "CloudSpace",
    description: "CloudSpace is a platform that allows users to create and share spaces with their friends.",
    link: "https://cloud-space.vercel.app/",
    code: "https://github.com/yatharth1706/Cloud-Space",
    previewImage: "/images/rice_v_f.png",
    techStack: ["Next.js", "React", "MongoDB", "Express", "Node.js", "TypeScript", "Tailwind CSS",],
  },
  {
    title: "BlogBuddy",
    description: "BlogBuddy is a platform that allows users to create and share blogs with their friends.",
    link: "https://blog-buddy-seven.vercel.app/",
    code: "https://github.com/yatharth1706/BlogBuddy",
    previewImage: "/images/rice_v_f.png",
    techStack: ["Next.js", "React", "MongoDB", "Express", "Node.js", "TypeScript", "Tailwind CSS",],
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
                <Link href={item.link}>
                  <Button variant="default">Preview</Button>
                </Link>
                <Link href={item.code}>
                  <Button variant="outline">Code</Button>
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
