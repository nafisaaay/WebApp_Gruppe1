"use client";

import { useRef,useState, type MouseEvent } from "react";
import { X } from "lucide-react";
import { Avatar } from "@/app/components/Avatar";
import type { PostDTO } from "../post-mapper";
import { DeletePostButton, EditPostForm } from "./PostActions";
import { useUser } from "@/features/user/components/UserProvider";

// Denne er for å vise en popo-up versjon av innleggene for å gi det en finere effekt.
export function PostCard({ post }: { post: PostDTO }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `post-${post.id}-title`;
  const { user } = useUser();
  const isOwner = user?.id === post.userId;
  const [isEditing, setIsEditing] = useState(false);

  const open = () => {
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) close();
  };

  return (
    <>
      {/* Kortet i feeden. Tittel-knappen strekkes over hele kortet (after:inset-0), så alt er klikkbart. */}
      <article className="card relative p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
        <header className="flex items-center gap-3">
          <Avatar name={post.userName} />
          <p className="font-semibold">{post.userName}</p>
        </header>

        <h3 className="mt-6 text-lg font-semibold">
          <button
            type="button"
            onClick={open}
            className="text-left after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-primary"
          >
            {post.title}
          </button>
        </h3>
        <p className="mt-2 line-clamp-3 leading-relaxed whitespace-pre-line">{post.text}</p>
      </article>

      {/* Pop-upen med hele innlegget */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={onDialogClick}
        onClose={() => (document.body.style.overflow = "")}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-3xl bg-surface p-0 text-ink shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm open:animate-pop"
      >
        <div className="relative max-h-[85dvh] overflow-y-auto p-6 sm:p-8">
          <button type="button" onClick={close} aria-label="Lukk innlegg" className="icon-btn absolute top-4 right-4">
            <X className="size-5" aria-hidden />
          </button>

          <header className="flex items-center gap-3 pr-10">
            <Avatar name={post.userName} size="lg" />
            <p className="text-lg font-semibold">{post.userName}</p>
          </header>
                      {isEditing ? (
            <div className="mt-6">
              <EditPostForm post={post} onCancel={() => setIsEditing(false)} />
            </div>
           ):(
            <>
              <h2 id={titleId} className="mt-6 text-2xl font-bold tracking-tight">{post.title}</h2>
              <p className="mt-3 text-[17px] leading-relaxed whitespace-pre-line">{post.text}</p>

              {isOwner ? (
                <div className="mt-6 flex gap-3 border-t border-line pt-4">
                  <button type="button" onClick={() => setIsEditing(true)}>Rediger</button>
                  <DeletePostButton post={post} />
                </div>
              ) : null}
            </>
          )}
        </div>
      </dialog>
    </>
  );
}