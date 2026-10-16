import type { TimerMode } from "../types";

export function TimerDisplay({ mode, remainingMs, elapsedMs }: { mode: TimerMode; remainingMs: number; elapsedMs: number })
{
  const totalSeconds = Math.floor((mode === "countdown" ? remainingMs : elapsedMs) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const value = hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const label: string = mode === "countdown"
    ? "Remaining"
    : "Elapsed";
  return (
    <>
    <p
      className="timer-display"
      aria-live="polite"
    >
      {value}
    </p>
    <p className="text-sm text-slate-500">{label}</p>
    </>
  );
}
