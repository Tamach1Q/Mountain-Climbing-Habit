import { HabitCard } from '../components/HabitCard';
import { ScreenHeader } from '../components/ScreenHeader';

export function RecordScreen({ user, todayMeters, todayFood, onRecord, onNavigate }) {
  const completedCount = user.habits.filter((habit) => habit.completedToday).length;

  return (
    <div className="stacked-screen">
      <ScreenHeader
        eyebrow="記録"
        title="今日の一歩を刻む"
        description="思い出す間もなく押せるくらい軽く。記録は、旅を止めないための小さな儀式です。"
      />

      <section className="summary-panel">
        <div>
          <p className="summary-panel__label">今日の獲得</p>
          <strong>+{todayMeters}m</strong>
        </div>
        <div className="summary-panel__aside">
          <span>食料 +{todayFood}</span>
          <span>
            {completedCount}/{user.habits.length} 完了
          </span>
        </div>
      </section>

      <section className="stack-list">
        {user.habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onRecord={onRecord} />
        ))}
      </section>

      <button type="button" className="secondary-button" onClick={() => onNavigate('home')}>
        山ホームに戻る
      </button>
    </div>
  );
}
