import { UserProvider } from "@/features/user/components/UserProvider";
import { toSessionUser } from "@/features/user/user-types";
import type { ReactNode } from "react";
import type { RequestInfo } from "rwsdk/worker";

type AppLayoutProps = {
    children?: ReactNode;
    requestInfo?: RequestInfo;
};

// Felles ramme rundt alle sider som krever innlogging.
// Henter innlogget bruker fra ctx (serveren) og gir den til UserProvider,
// slik at alle klientkomponenter inni kan bruke useUser().
export function AppLayout({ children, requestInfo }: AppLayoutProps) {
    const user = requestInfo ? toSessionUser(requestInfo.ctx.session) : null;
    return <UserProvider user={user}>{children}</UserProvider>;
}