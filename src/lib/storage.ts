import type { Task } from "../types";

const TASKS_STORAGE_KEY = "tempo.tasks";
const CURRENT_TASK_STORAGE_KEY = "tempo.currentTaskId";

function readStoredValue(key: string): unknown
{
  const rawValue = window.localStorage.getItem(key);
  if (rawValue === null)
  {
    return null;
  }
  try
  {
    return JSON.parse(rawValue);
  }
  catch
  {
    return null;
  }
}

function writeStoredValue(key: string, value: unknown): void
{
  window.localStorage.setItem(key, JSON.stringify(value));
}

function isStoredTask(value: unknown): value is Task
{
  if (typeof value !== "object" || value === null)
  {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === "string"
    && typeof candidate.title === "string"
    && typeof candidate.accumulatedMs === "number"
    && typeof candidate.createdAt === "number";
}

export function loadTasks(): Task[]
{
  const storedTasks: unknown = readStoredValue(TASKS_STORAGE_KEY);
  if (!Array.isArray(storedTasks))
  {
    return [];
  }
  return storedTasks.filter(isStoredTask);
}

export function saveTasks(tasks: Task[]): void
{
  writeStoredValue(TASKS_STORAGE_KEY, tasks);
}

export function loadCurrentTaskId(): string | null
{
  const storedId: unknown = readStoredValue(CURRENT_TASK_STORAGE_KEY);
  if (typeof storedId === "string" && storedId.length > 0)
  {
    return storedId;
  }
  return null;
}

export function saveCurrentTaskId(id: string | null): void
{
  writeStoredValue(CURRENT_TASK_STORAGE_KEY, id);
}
