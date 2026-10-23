import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { postRoutes } from "./features/post/post-routes";
import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { ForumPage } from "./features/pages/ForumPage";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ...postRoutes,
  route("/api/status", () => Response.json({ status: "ok", version: "0.1.0" })),


  render(Document, 
    [
      route("/", Home),
      route("/forum",  ForumPage),

    ]),

]);
