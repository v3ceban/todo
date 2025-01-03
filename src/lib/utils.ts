import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nameRegex = /^[a-zA-Z'-]+$/;

export const handleKeyDown = async (e: React.KeyboardEvent, cb: (() => void) | (() => Promise<void>)) => {
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice && e.nativeEvent.isComposing) {
    return;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    await cb();
  }
}
