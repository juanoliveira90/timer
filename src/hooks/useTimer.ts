import { useEffect, useRef, useState } from "react";
import type { CountdownParts, TimerMode } from "../types";
import {
  countdownPartsFromTotalMs,
  remainingMsOfTarget,
  targetTotalMsFromParts,
  totalConsumedMs,
} from "../lib/timer";

export interface TimerView
{
  mode: TimerMode;
  running: boolean;
  remainingMs: number;
  elapsedMs: number;
  countdownParts: CountdownParts;
  start(): void;
  pause(): void;
  resume(): void;
  reset(): void;
  finish(): void;
  setMode(mode: TimerMode): void;
  setTarget(parts: CountdownParts): void;
}

export function useTimer(onElapsed: (deltaMs: number) => void): TimerView
{
  const [mode, setModeState] = useState<TimerMode>("countdown");
  const [targetTotalMs, setTargetTotalMs] = useState<number>(0);
  const [elapsedBaseMs, setElapsedBaseMs] = useState<number>(0);
  const [runStartedAt, setRunStartedAt] = useState<number | null>(null);
  const [, setNow] = useState<number>(Date.now());
  const onElapsedRef = useRef(onElapsed);
  onElapsedRef.current = onElapsed;
  const lastTickAt = useRef<number>(Date.now());

  const running: boolean = runStartedAt !== null;

  function stopRun(current: number): void
  {
    setElapsedBaseMs(totalConsumedMs(elapsedBaseMs, runStartedAt, current));
    setRunStartedAt(null);
  }

  function start(): void
  {
    if (running)
    {
      return;
    }
    setRunStartedAt(Date.now());
  }

  function pause(): void
  {
    if (!running)
    {
      return;
    }
    stopRun(Date.now());
  }

  function resume(): void
  {
    if (running)
    {
      return;
    }
    setRunStartedAt(Date.now());
  }

  function reset(): void
  {
    setElapsedBaseMs(0);
    setRunStartedAt(null);
  }

  function finish(): void
  {
    if (!running)
    {
      return;
    }
    stopRun(Date.now());
  }

  function changeMode(nextMode: TimerMode): void
  {
    if (running)
    {
      return;
    }
    setModeState(nextMode);
  }

  function changeTarget(parts: CountdownParts): void
  {
    if (running)
    {
      return;
    }
    setTargetTotalMs(targetTotalMsFromParts(parts));
  }

  useEffect
  (
    () =>
    {
      if (!running)
      {
        return;
      }
      const interval = window.setInterval
      (
        () =>
        {
          const current = Date.now();
          setNow(current);
          const delta = current - lastTickAt.current;
          lastTickAt.current = current;
          if (delta > 0)
          {
            onElapsedRef.current(delta);
          }
          if (mode === "countdown" && remainingMsOfTarget(targetTotalMs, totalConsumedMs(elapsedBaseMs, runStartedAt, current)) <= 0)
          {
            stopRun(current);
          }
        },
        250
      );
      return () => window.clearInterval(interval);
    },
    [running, mode]
  );

  const consumedMs = totalConsumedMs(elapsedBaseMs, runStartedAt, Date.now());
  const remaining: number = mode === "countdown"
    ? remainingMsOfTarget(targetTotalMs, consumedMs)
    : 0;
  const parts: CountdownParts = countdownPartsFromTotalMs(targetTotalMs);

  return {
    mode,
    running,
    remainingMs: remaining,
    elapsedMs: consumedMs,
    countdownParts: parts,
    start,
    pause,
    resume,
    reset,
    finish,
    setMode: changeMode,
    setTarget: changeTarget,
  };
}
