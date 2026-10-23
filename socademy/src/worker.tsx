import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { userController } from "./features/user/user-controller";
import { Errors } from "./features/results";
import { auth } from "./features/auth/auth";
import { sessionMiddleware  } from "./features/user/middleware/session";
import { Login } from "./app/pages/login";

export type AppContext = {};

export default defineApp([
    setCommonHeaders(),
    sessionMiddleware,

    // ---- Auth / user ----
    route("/api/auth/*", ({ request }) => auth.handler(request)),
    route("/api/users/me", (info) =>
        info.request.method === "GET"
            ? userController.get(info)
            : Response.json({ error: Errors.notSupported }, { status: Errors.notSupported.code })
    ),

    // Trenger ikke den her ettersom innlogging går via BetterAuth
    // route("/api/login", (info) => 
    // info.request.method === "POST" ? userController.create(info)
    // : Response.json({ error: Errors.notSupported }, { status: Errors.notSupported.code })
    // ),

    render(Document, [
        route("/", Home),
        route("/login", Login),
    ]),
]);