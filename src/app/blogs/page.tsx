import CustomDock from "@/components/CustomDock"
import Intro from "@/components/Intro"

const Blogs = () => {
  return (
    <div className="relative w-8/12 mx-auto items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full overflow-hidden">
        <h1 className="text-2xl font-bold">[Blogs]</h1>
      </main>
      <CustomDock />
    </div>
  )
}

export default Blogs
