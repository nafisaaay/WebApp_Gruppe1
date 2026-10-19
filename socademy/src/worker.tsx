import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { userController } from "./features/user/user-controller";
import { Errors } from "./features/results";
import { loginAuth } from "./features/auth/loginAuth";
import { sessionMiddleware  } from "./features/user/middleware/session";

export type AppContext = {};

export default defineApp([
    sessionMiddleware,
    route("/api/login", (info) => 
    info.request.method === "POST" ? userController.create(info)
    : Response.json({ error: Errors.notSupported }, { status: Errors.notSupported.code })
    ),
    route("/api/auth/*", ({ request }) => loginAuth.handler(request)),
    route("/api/users/me", (info) =>
      info.request.method === "GET"
          ? userController.get(info)
          : Response.json({ error: Errors.notSupported }, { status: Errors.notSupported.code })
    ),
]);
