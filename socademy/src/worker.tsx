import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { userController } from "./features/user/user-controller";
import { auth } from "./features/auth/auth";
import { sessionMiddleware  } from "./features/user/middleware/session";
import { Login } from "./app/pages/login";
import { Register } from "./app/pages/register";
import { requireUserPage, requireUserRoute } from "./features/user/middleware/guards";

export type AppContext = {};

export default defineApp([
    setCommonHeaders(),
    sessionMiddleware,

    // ---- Auth / user ----
    route("/api/auth/*", ({ request }) => auth.handler(request)),
    route("/api/users/me", {
        get: [requireUserRoute, userController.get],
    }),

    render(Document, [
        route("/", [requireUserPage, Home]),
        route("/login", Login),
        route("/register", Register),
    ]),
]);