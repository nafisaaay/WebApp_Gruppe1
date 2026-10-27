import { route } from "rwsdk/router";
import { eventsController } from "./events-controller"

export const eventRoutes = [
    route("/api/v1/events", {
        get: eventsController.getAll,
        post: [eventsController.create],
    }),

    route("/api/v1/events/:id", {
        get: eventsController.get,
        patch: [eventsController.update],
        delete: [eventsController.remove]
    }

    )
]