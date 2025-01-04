"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "~/lib/utils";

const EmptyTaskList = ({
  children,
  imgSrc,
  className,
  textClassName,
}: {
  children: Readonly<React.ReactNode>;
  imgSrc: string;
  className?: string;
  textClassName?: string;
}) => {
  const { resolvedTheme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section className={cn(`flex flex-col-reverse items-center`, className)}>
      <section
        className={cn(`text-center text-lg font-semibold`, textClassName)}
      >
        {children}
      </section>
      <Image
        src={imgSrc}
        alt="Empty folder"
        width={384}
        height={384}
        className={`block w-full max-w-sm opacity-90 ${resolvedTheme === "dark" ? "invert filter" : ""}`}
      />
    </section>
  );
};

export default EmptyTaskList;
