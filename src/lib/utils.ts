import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nameRegex = /^[a-zA-Z'-]+$/;

export const handleKeyDown = async (
  e: React.KeyboardEvent,
  cb: (() => void) | (() => Promise<void>),
) => {
  if (e.key === "Enter") {
    if (
      ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
      e.target instanceof HTMLElement
    ) {
      e.target.blur();
      return;
    }
    e.preventDefault();
    await cb();
  }
};

export const pushWindowState = (url: string) => {
  window.history.pushState({}, "", url);
};
