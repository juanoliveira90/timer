import type { TimerView } from "../hooks/useTimer";

export function TimerControls({ api }: { api: TimerView })
{
  const running: boolean = api.running;
  return (
    <div className="timer-controls">
      <button
        type="button"
        className="control-button quiet"
        onClick={api.reset}
      >
        Reset
      </button>
      {running
        ? <button
          type="button"
          className="control-button primary"
          onClick={api.pause}
        >
          Ⅱ &nbsp;Pause
        </button>
        : <button
          type="button"
          className="control-button primary"
          onClick={api.resume}
        >
          ▶ &nbsp;Resume
        </button>}
      <button
        type="button"
        className="control-button quiet"
        disabled={!running}
        onClick={api.finish}
      >
        □ &nbsp;Finish
      </button>
    </div>
  );
}
