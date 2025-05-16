const skillsData: string[] = [
  "Go",
  "Python",
  "JS/TS",
  "gRPC",
  "GraphQL",
  "fiber",
  "flask",
  "React.js",
  "Next.js",
  "Git/GitHub/Actions",
  "Jenkins",
  "Docker",
  "WSL",
  "NixOS",
  "NeoVim",
  "Emacs",
];

const Skills = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">[Skills]</h1>
      <div className="flex flex-wrap gap-1">
        {skillsData.map((skill, index) => (
          <div key={index} className="flex border border-black rounded-md px-2 py-1 text-xs bg-black text-white dark:text-black dark:bg-white">
            {skill}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
