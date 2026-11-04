"use client";

import { useUser } from "@/features/user/components/UserProvider";
import { Avatar } from "./Avatar";

export function SidebarUser() {
    const { user } = useUser();
    if (!user) return null;

    return (
        <div className="hidden items-center gap-3 lg:flex">
            <Avatar name={user.name} />
            <div className="min-w-0 leading-tight">
                <p className="truncate font-semibold">{user.name}</p>
            </div>
        </div>
    );
}
