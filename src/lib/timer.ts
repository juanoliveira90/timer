import type { CountdownParts } from "../types";

export function countdownPartsFromTotalMs(totalMs: number): CountdownParts
{
  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours,
    minutes,
    seconds,
  };
}

export function targetTotalMsFromParts(parts: CountdownParts): number
{
  const totalSeconds = parts.hours * 3600 + parts.minutes * 60 + parts.seconds;
  return totalSeconds * 1000;
}

export function remainingMsOfTarget(targetTotalMs: number, consumedMs: number): number
{
  const remaining = targetTotalMs - consumedMs;
  if (remaining < 0)
  {
    return 0;
  }
  return remaining;
}

export function runningOnlyMs(runStartedAt: number | null, current: number): number
{
  if (runStartedAt === null)
  {
    return 0;
  }
  return current - runStartedAt;
}

export function totalConsumedMs(elapsedBaseMs: number, runStartedAt: number | null, current: number): number
{
  return elapsedBaseMs + runningOnlyMs(runStartedAt, current);
}
