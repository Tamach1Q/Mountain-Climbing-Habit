export function HabitCard({ habit, onRecord }) {
  return (
    <article className={`habit-card ${habit.completedToday ? 'is-complete' : ''}`}>
      <div className="habit-card__meta">
        <p className="habit-card__category">{habit.category}</p>
        <h3 className="habit-card__title">{habit.title}</h3>
        <p className="habit-card__reward">
          山道 +{habit.rewardMeters}m
          {habit.rewardFood > 0 ? ` / 食料 +${habit.rewardFood}` : ''}
        </p>
      </div>

      <button
        type="button"
        className={`habit-card__button ${habit.completedToday ? 'is-complete' : ''}`}
        onClick={() => onRecord(habit.id)}
        disabled={habit.completedToday}
      >
        {habit.completedToday ? '今日の分は記録済み' : 'この一歩を刻む'}
      </button>
    </article>
  );
}
