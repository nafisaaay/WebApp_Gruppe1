import { layout, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { postRoutes } from "./features/post/post-routes";
import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { ForumPage } from "./app/pages/ForumPage";
import { userController } from "./features/user/user-controller";
import { auth } from "./features/auth/auth";
import { sessionMiddleware  } from "./features/auth/middleware/session";
import { Login } from "./app/pages/login";
import { Register } from "./app/pages/register";
import { requireUserPage, requireUserRoute } from "./features/auth/middleware/guards";
import { AppLayout } from "./app/components/layout/AppLayout";

export type AppContext = {};

export default defineApp([
    // Middleware: kjøres for ALLE forespørsler, i denne rekkefølgen.
    setCommonHeaders(),
    sessionMiddleware,  // finner ut hvem som er logget inn -> ctx.session

    // ---- Auth / user ----
    route("/api/auth/*", ({ request }) => auth.handler(request)),
    route("/api/users/me", {
        get: [requireUserRoute, userController.get],
    }),

    // ---- Innlegg -----
    ...postRoutes,

    // ---- Status -----
    route("/api/status", () => Response.json({ status: "ok", version: "0.3.0" })),

    // ---- Sider ----
    render(Document, [
        // Innloggede sider: får UserProvider fra AppLayout
        layout(AppLayout, [
            route("/", [requireUserPage, Home]),
            route("/forum", [requireUserPage, ForumPage]),
        ]),
        // Åpne sider
        route("/login", Login),
        route("/register", Register),
    ]),
]);