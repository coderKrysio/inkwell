import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const IsAuthenticated = async ({
    children,
}: {
    children: ReactNode;
}) => {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (isUserAuthenticated) {
        return <>{children}</>;
    }
};
