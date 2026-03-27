import { ScreenHeader } from '../components/ScreenHeader';
import { formatLogTime } from '../utils/gameLogic';

export function ProfileScreen({ user, dailyLogs }) {
  const recentLogs = dailyLogs.slice(0, 5);

  return (
    <div className="stacked-screen">
      <ScreenHeader
        eyebrow="マイページ"
        title="旅のしおり"
        description="理想の自分、今続いている習慣、そして最近刻んだ一歩を静かに振り返ります。"
      />

      <section className="profile-hero">
        <div className={`profile-hero__avatar profile-hero__avatar--${user.avatarStyle}`}>
          {user.name.slice(0, 1)}
        </div>
        <div>
          <p className="profile-hero__eyebrow">理想の自分</p>
          <h2>{user.goalTitle}</h2>
          <p>{user.name} の山旅は、毎日の小さな行動を道に変えながら続いています。</p>
        </div>
      </section>

      <section className="profile-stats">
        <article className="profile-stat">
          <span>連続日数</span>
          <strong>{user.streakDays}日</strong>
        </article>
        <article className="profile-stat">
          <span>現在地</span>
          <strong>{user.progressMeters}m</strong>
        </article>
        <article className="profile-stat">
          <span>持っている食料</span>
          <strong>{user.food}</strong>
        </article>
      </section>

      <section className="card-panel">
        <p className="card-panel__eyebrow">連れている習慣</p>
        <div className="habit-tag-list">
          {user.habits.map((habit) => (
            <div key={habit.id} className="habit-tag">
              <strong>{habit.title}</strong>
              <span>+{habit.rewardMeters}m</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card-panel">
        <p className="card-panel__eyebrow">最近の記録</p>
        {recentLogs.length === 0 ? (
          <p className="empty-copy">まだ記録はありません。最初の一歩を刻むとここに並びます。</p>
        ) : (
          <div className="log-list">
            {recentLogs.map((log) => {
              const habit = user.habits.find((item) => item.id === log.habitId);
              return (
                <article key={log.id} className="log-item">
                  <div>
                    <strong>{habit?.title || '記録'}</strong>
                    <p>{formatLogTime(log.completedAt)}</p>
                  </div>
                  <div className="log-item__gain">
                    <span>+{log.rewardMeters}m</span>
                    {log.rewardFood > 0 ? <span>食料 +{log.rewardFood}</span> : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
