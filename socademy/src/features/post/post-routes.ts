import { route } from "rwsdk/router";
import { postController } from "./post-controller";

export const postRoutes = [
    route("/api/v3/posts",{
        get: postController.getAll,
        post: [
            postController.create,
        ],
    }),
    route("/api/v3/posts/:id",{
        get: postController.get,
        patch: [
            postController.update,
        ],
        delete: [
            postController.remove,
        ],
    })

];