import type { CountdownParts } from "../types";

export function CountdownEditor({ parts, disabled, onChange }: { parts: CountdownParts; disabled: boolean; onChange: (parts: CountdownParts) => void })
{
  function update(hours: number, minutes: number, seconds: number): void
  {
    onChange
    (
      {
        hours,
        minutes,
        seconds,
      }
    );
  }

  return (
    <div className="countdown-editor">
      <NumberField
        label="Hours"
        value={parts.hours}
        disabled={disabled}
        onChange={(hours) => update(hours, parts.minutes, parts.seconds)}
      />
      <NumberField
        label="Minutes"
        value={parts.minutes}
        disabled={disabled}
        onChange={(minutes) => update(parts.hours, minutes, parts.seconds)}
      />
      <NumberField
        label="Seconds"
        value={parts.seconds}
        disabled={disabled}
        onChange={(seconds) => update(parts.hours, parts.minutes, seconds)}
      />
    </div>
  );
}

function NumberField({ label, value, disabled, onChange }: { label: string; value: number; disabled: boolean; onChange: (value: number) => void })
{
  function commit(nextValue: number): void
  {
    const safeValue: number = Number.isNaN(nextValue) ? 0 : nextValue;
    onChange(safeValue);
  }

  return (
    <label className="flex flex-col gap-1 text-xs text-slate-500">
      <span>{label}</span>
      <input
        type="number"
        min={0}
        max={99}
        value={value}
        disabled={disabled}
        onChange={(event) => commit(event.target.valueAsNumber)}
      />
    </label>
  );
}
