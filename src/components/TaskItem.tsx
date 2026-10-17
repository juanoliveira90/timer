import { useState } from "react";
import { formatClock } from "../lib/format";
import type { Task } from "../types";
import type { TasksApi } from "../hooks/useTasks";

export interface TaskItemProps { api: TasksApi; task: Task; isCurrent: boolean; running: boolean; editing: boolean; onStartEdit: () => void; onCommitEdit(title: string): void; onCancelEdit: () => void; }

export function TaskItem({ api, task, isCurrent, running, editing, onStartEdit, onCommitEdit, onCancelEdit }: TaskItemProps)
{
  const [draftTitle, setDraftTitle] = useState(task.title);
  const active = isCurrent && running;
  function commitEditing(): void
  {
    const title = draftTitle.trim();
    if (!title) { onCancelEdit(); return; }
    onCommitEdit(title);
  }
  if (editing) return <li className="task-row editing-row"><input autoFocus className="task-edit" aria-label="Task name" value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") commitEditing(); if (event.key === "Escape") onCancelEdit(); }} /><button type="button" onClick={commitEditing}>Save</button></li>;
  return (
    <li className={`task-row ${active ? "active-task" : ""}`}>
      <button type="button" className="task-check" aria-label={`Select ${task.title || "task"}`} onClick={() => api.setCurrentTask?.(task.id)} />
      <div className="task-copy"><button type="button" className="task-name" onClick={() => { setDraftTitle(task.title); onStartEdit(); }}>{task.title || "Untitled task"}</button><span className="task-project">{active && <em> · Tracking now</em>}</span></div>
      <span className="task-time">{formatClock(task.accumulatedMs)}</span>
      <button type="button" className="task-remove" aria-label={`Remove ${task.title || "task"}`} onClick={() => api.removeTask(task.id)}>×</button>
    </li>
  );
}
