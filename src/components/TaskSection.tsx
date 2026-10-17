import { useState } from "react";
import { AddTaskButton } from "./AddTaskButton";
import { TaskItem } from "./TaskItem";
import type { TasksApi } from "../hooks/useTasks";

export interface TaskSectionProps { api: TasksApi; running: boolean; }

export function TaskSection({ api, running }: TaskSectionProps)
{
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  function handleAddTask(): void
  {
    const created = api.addTask("");
    setEditingTaskId(created.id);
  }
  return (
    <section className="tasks-panel">
      <div className="tasks-heading"><h2>Your tasks</h2></div>
      <div className="task-columns"><span>Task / project</span><span>Time worked</span></div>
      <ul className="task-list" role="list">
        {api.tasks.map((task) => <TaskItem key={task.id} api={api} task={task} isCurrent={api.currentTask?.id === task.id} running={running} editing={editingTaskId === task.id} onStartEdit={() => setEditingTaskId(task.id)} onCommitEdit={(title) => { api.renameTask(task.id, title); setEditingTaskId(null); }} onCancelEdit={() => setEditingTaskId(null)} />)}
      </ul>
      <AddTaskButton onAdd={handleAddTask} />
      <div className="task-summary"><span>{api.tasks.length ? `0 of ${api.tasks.length} completed` : "No tasks yet"}</span></div>
    </section>
  );
}
