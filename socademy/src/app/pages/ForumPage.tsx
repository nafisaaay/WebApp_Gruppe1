import { PostForm } from "@/features/post/components/PostForm"
import { PostList } from "@/features/post/components/PostList"

export function ForumPage(){
   return(
    <main>
        <h1>Forum side</h1>
        <PostForm/>
        <PostList/>
    </main>
   )
}