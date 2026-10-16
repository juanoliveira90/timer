import { useState } from "react";
import { Header } from "./components/Header";
import { TimerSection } from "./components/TimerSection";
import { TaskSection } from "./components/TaskSection";
import { useTasks } from "./hooks/useTasks";
import { useTimer } from "./hooks/useTimer";

export default function App()
{
  const tasksApi = useTasks();
  const timerApi = useTimer(tasksApi.addElapsed);
  const [tasksOpen, setTasksOpen] = useState(false);

  return (
    <main className="tempo-shell">
      <Header />
      <div className={`workspace ${tasksOpen ? "tasks-open" : "tasks-closed"}`}>
        <TimerSection api={timerApi} tasks={tasksApi} />
        <div className="tasks-slot" aria-hidden={!tasksOpen} inert={!tasksOpen}>
          <TaskSection api={tasksApi} running={timerApi.running} />
        </div>
      </div>
      <button type="button" className={`tasks-toggle ${tasksOpen ? "is-open" : ""}`} aria-label={tasksOpen ? "Hide tasks" : "Show tasks"} aria-expanded={tasksOpen} onClick={() => setTasksOpen(!tasksOpen)}>
        <span className="tasks-toggle-icon" aria-hidden="true"><i /><i /><i /></span>
      </button>
    </main>
  );
}
