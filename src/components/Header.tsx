export function Header()
{
  const today = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="Tempo home"><span className="brand-mark"><i /><i /><i /></span><span>tempo</span></a>
      <span className="today-date">{today}</span>
      <div className="save-status"> Make each second count! {/*<button type="button" aria-label="Settings" className="settings-button">☷</button>*/}</div>
    </header>
  );
}
