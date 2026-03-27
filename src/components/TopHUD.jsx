export function TopHUD({ user, todayMeters, route }) {
  return (
    <header className={`top-hud top-hud--${route}`}>
      <div className="top-hud__cluster">
        <div className={`hud-avatar hud-avatar--${user.avatarStyle}`}>
          <span>{user.name.slice(0, 1)}</span>
        </div>
        <div>
          <p className="top-hud__label">今日の一歩</p>
          <p className="top-hud__value">+{todayMeters}m</p>
        </div>
      </div>

      <div className="top-hud__chips">
        <span className="hud-chip">{user.progressMeters}m</span>
        <span className="hud-chip hud-chip--food">食料 {user.food}</span>
      </div>
    </header>
  );
}
