import type { Task } from "../types";

export function createTask(title: string): Task
{
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    title,
    accumulatedMs: 0,
    createdAt: now,
  };
}

export function findCurrentTask(tasks: Task[], currentTaskId: string | null): Task | null
{
  if (currentTaskId === null)
  {
    return null;
  }
  const found = tasks.find((task) => task.id === currentTaskId);
  return found ?? null;
}

export function withoutTask(tasks: Task[], taskId: string): Task[]
{
  const remainingTasks: Task[] = [];
  for (const task of tasks)
  {
    if (task.id !== taskId)
    {
      remainingTasks.push(task);
    }
  }
  return remainingTasks;
}

export function withAddedTime(tasks: Task[], taskId: string, deltaMs: number): Task[]
{
  const updatedTasks: Task[] = [];
  for (const task of tasks)
  {
    if (task.id === taskId)
    {
      updatedTasks.push(createTimeAddedTask(task, deltaMs));
      continue;
    }
    updatedTasks.push(task);
  }
  return updatedTasks;
}

export function withRenamedTask(tasks: Task[], taskId: string, title: string): Task[]
{
  const updatedTasks: Task[] = [];
  for (const task of tasks)
  {
    if (task.id === taskId)
    {
      updatedTasks.push(createRenamedTask(task, title));
      continue;
    }
    updatedTasks.push(task);
  }
  return updatedTasks;
}

function createTimeAddedTask(task: Task, deltaMs: number): Task
{
  const updated: Task =
  {
    id: task.id,
    title: task.title,
    accumulatedMs: task.accumulatedMs + deltaMs,
    createdAt: task.createdAt,
  };
  return updated;
}

function createRenamedTask(task: Task, title: string): Task
{
  const updated: Task =
  {
    id: task.id,
    title,
    accumulatedMs: task.accumulatedMs,
    createdAt: task.createdAt,
  };
  return updated;
}
