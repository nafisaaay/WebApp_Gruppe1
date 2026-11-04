"use client";

import { createContext, use, type ReactNode } from "react";
import { isAdmin, type SessionUser } from "@/features/user/user-types";

// Det klientkomponentene kan hente med useUser().
type UserContextValue = {
    user: SessionUser | null;
    isAdmin: boolean;
};

const UserContext = createContext<UserContextValue | null>(null);

type UserProviderProps = {
    user: SessionUser | null;
    children: ReactNode;
};

export function UserProvider({ user, children }: UserProviderProps) {
    const value = {
        user,
        isAdmin: isAdmin(user),
    };
    return <UserContext value={value}>{children}</UserContext>;
}

export function useUser() {
    const context = use(UserContext);
    if(!context) {
        throw new Error("useUser må brukes inne i <UserProvider>.");
    }
    return context;
}
