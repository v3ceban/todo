"use client";

import React from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { Spinner } from "~/components/ui/spinner";
export const AuthButton = ({
  session,
  className,
  variant,
}: {
  session: Session | null;
  className?: string;
  variant?: ButtonProps["variant"];
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    await signIn("google");
  };

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  const text = session ? "Sign out" : "Sign in";
  const loadingText = session ? "Signing out" : "Signing in";

  return (
    <Button
      className={className}
      onClick={session ? handleLogout : handleLogin}
      variant={variant}
    >
      {loading ? (
        <>
          <Spinner /> {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
};
