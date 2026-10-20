

export async function createPost(data:unknown) {
    try{
        const result = await fetch("/api/posts",{
            method: "POST",
            body: JSON.stringify(data)
        })
        return await result.json()
    }
    catch(error){
        console.error(error)
        return{
            ok:false,
            error:{
                message:"Could not load posts. Please try again."
            }
        }
    }

}