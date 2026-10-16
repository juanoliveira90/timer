import type { TimerMode } from "../types";

export function ModeSwitch({ mode, onSelect }: { mode: TimerMode; onSelect: (mode: TimerMode) => void })
{
  return (
    <div className="mode-switch" role="tablist" aria-label="Timer mode">
      <button
        type="button"
        role="tab" aria-selected={mode === "countdown"}
        className={mode === "countdown" ? "mode-tab selected" : "mode-tab"}
        onClick={() => onSelect("countdown")}
      >
        Countdown
      </button>
      <button
        type="button"
        role="tab" aria-selected={mode === "chronometer"}
        className={mode === "chronometer" ? "mode-tab selected" : "mode-tab"}
        onClick={() => onSelect("chronometer")}
      >
        Chronometer
      </button>
    </div>
  );
}
