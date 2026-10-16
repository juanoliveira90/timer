export type TimerMode = "countdown" | "chronometer";

export interface CountdownParts
{
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Task
{
  id: string;
  title: string;
  accumulatedMs: number;
  createdAt: number;
}
