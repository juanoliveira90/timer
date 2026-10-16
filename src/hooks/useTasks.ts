import { useEffect, useState } from "react";
import type { Task } from "../types";
import { createTask, findCurrentTask, withAddedTime, withRenamedTask, withoutTask } from "../lib/tasks";
import { loadCurrentTaskId, loadTasks, saveCurrentTaskId, saveTasks } from "../lib/storage";

export interface TasksApi
{
  tasks: Task[];
  currentTask: Task | null;
  addTask(title: string): Task;
  removeTask(id: string): void;
  renameTask(id: string, title: string): void;
  setCurrentTask(id: string | null): void;
  addElapsed(deltaMs: number): void;
}

export function useTasks(): TasksApi
{
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(loadCurrentTaskId);

  useEffect
  (
    () =>
    {
      saveTasks(tasks);
    },
    [tasks]
  );

  useEffect
  (
    () =>
    {
      saveCurrentTaskId(currentTaskId);
    },
    [currentTaskId]
  );

  const currentTask: Task | null = findCurrentTask(tasks, currentTaskId);

  function addTask(title: string): Task
  {
    const created = createTask(title);
    setTasks
    (
      [...tasks, created]
    );
    setCurrentTaskId(created.id);
    return created;
  }

  function removeTask(id: string): void
  {
    setTasks(withoutTask(tasks, id));
    if (currentTaskId === id)
    {
      setCurrentTaskId(null);
    }
  }

  function renameTask(id: string, title: string): void
  {
    setTasks(withRenamedTask(tasks, id, title));
  }

  function addElapsed(deltaMs: number): void
  {
    if (currentTask === null)
    {
      return;
    }
    setTasks(withAddedTime(tasks, currentTask.id, deltaMs));
  }

  return {
    tasks,
    currentTask,
    addTask,
    removeTask,
    renameTask,
    setCurrentTask: setCurrentTaskId,
    addElapsed,
  };
}
