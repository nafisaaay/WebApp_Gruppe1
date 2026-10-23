import { PostForm } from "../post/components/PostForm";
import {PostList} from "../post/components/PostList"

export function ForumPage(){
   return(
    <main>
        <h1>Forum side</h1>
        <PostForm/>
        <PostList/>
    </main>
   )
}