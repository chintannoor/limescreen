'use client';

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};


const NextAuthProvider = ({ children }: Props) => {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default NextAuthProvider