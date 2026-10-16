import { useEffect, useRef, useState } from "react";
import { CountdownEditor } from "./CountdownEditor";
import { ModeSwitch } from "./ModeSwitch";
import { TimerControls } from "./TimerControls";
import { TimerDisplay } from "./TimerDisplay";
import alarmSong from "../../songs/timer-app_ocarina-of-time.mp3";
import type { TimerView } from "../hooks/useTimer";
import type { TasksApi } from "../hooks/useTasks";

export function TimerSection({ api, tasks }: { api: TimerView; tasks: TasksApi })
{
  const [showTarget, setShowTarget] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (!api.alarm) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      return;
    }
    const audio = new Audio(alarmSong);
    audio.loop = true;
    audioRef.current = audio;
    void audio.play().catch(() => {
      // Browsers may block playback when the page has not received user input.
    });
    return () => {
      audio.pause();
      audio.currentTime = 0;
      if (audioRef.current === audio) audioRef.current = null;
    };
  }, [api.alarm]);
  const targetMinutes = api.countdownParts.hours * 60 + api.countdownParts.minutes;
  return (
    <section className="timer-panel">
      <ModeSwitch mode={api.mode} onSelect={api.setMode} />
      <div className="focus-status"><span />{api.running ? "In focus" : "Ready to focus"}</div>
      <TimerDisplay mode={api.mode} remainingMs={api.remainingMs} elapsedMs={api.elapsedMs} />
      {api.mode === "countdown" && <div className="timer-target">
        <span>of {targetMinutes || api.countdownParts.seconds} {targetMinutes ? "minutes" : "seconds"}</span>
        <button type="button" aria-label="Edit countdown" onClick={() => setShowTarget(!showTarget)}>↗</button>
      </div>}
      {api.mode === "countdown" && <div className="timer-progress"><span style={{ width: `${targetMinutes > 0 ? Math.min(100, api.elapsedMs / (targetMinutes * 60_000) * 100) : 0}%` }} /></div>}
      {showTarget && <CountdownEditor parts={api.countdownParts} disabled={api.running} onChange={api.setTarget} />}
      <TimerControls api={api} />
      <div className="assign-task">
        <label className="eyebrow" htmlFor="current-task">Adding time to</label>
        <select id="current-task" className="current-task-label" value={tasks.currentTask?.id ?? ""} onChange={(event) => tasks.setCurrentTask(event.target.value || null)}>
          <option value="">Select a task</option>
          {tasks.tasks.map((task) => <option key={task.id} value={task.id}>{task.title || "Untitled task"}</option>)}
        </select>
        <div className="sound-note">◖ &nbsp;Chime when finished</div>
      </div>
    </section>
  );
}
