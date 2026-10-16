export function AddTaskButton({ onAdd }: { onAdd: () => void })
{
  return (
    <button
      type="button"
      className="add-task-button"
      onClick={onAdd}
    >
      + Add Task
    </button>
  );
}
