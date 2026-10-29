import { Header } from "@/app/components/Header"
import { Sidebar } from "@/app/components/Sidebar"
import { PostForm } from "@/features/post/components/PostForm"
import { PostList } from "@/features/post/components/PostList"

export function ForumPage(){
   return(
    <>
      <Header />
      <div className="flex flex-col gap-6 px-4 pb-6 sm:px-8 lg:flex-row lg:gap-9">
        <Sidebar active="forum" />
        <main className="min-w-0 flex-1">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <h1 className="text-3xl font-bold tracking-tight">Forum</h1>
            <PostForm/>
            <PostList/>
          </div>
        </main>
      </div>
    </>
   )
}