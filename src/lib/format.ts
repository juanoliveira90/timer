export function formatClock(totalMs: number): string
{
  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0)
  {
    return hours + "h " + pad(minutes) + "m " + pad(seconds) + "s";
  }
  if (minutes > 0)
  {
    return minutes + "m " + pad(seconds) + "s";
  }
  return pad(seconds) + "s";
}

function pad(value: number): string
{
  return value.toString().padStart(2, "0");
}
