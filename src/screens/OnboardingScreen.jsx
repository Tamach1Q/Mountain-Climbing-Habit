import { useMemo, useState } from 'react';
import { goalOptions, habitLibrary } from '../data/gameContent';

export function OnboardingScreen({ onComplete }) {
  const [selectedGoalId, setSelectedGoalId] = useState(goalOptions[0].id);
  const [selectedHabitIds, setSelectedHabitIds] = useState(['walk', 'stretch']);
  const [name, setName] = useState('ユウ');

  const selectedGoal = useMemo(
    () => goalOptions.find((goal) => goal.id === selectedGoalId) || goalOptions[0],
    [selectedGoalId],
  );

  function toggleHabit(habitId) {
    setSelectedHabitIds((current) => {
      if (current.includes(habitId)) {
        return current.filter((item) => item !== habitId);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, habitId];
    });
  }

  return (
    <div className="onboarding">
      <section className="onboarding__hero">
        <p className="screen-header__eyebrow">はじまりの支度</p>
        <h1 className="onboarding__title">仲間と歩く山道を決めよう</h1>
        <p className="onboarding__description">
          習慣は管理項目ではなく、山道を前に進める一歩です。今日の行動が、そのまま旅の景色になります。
        </p>
      </section>

      <section className="card-stack">
        <div className="field">
          <label className="field__label" htmlFor="player-name">
            呼ばれたい名前
          </label>
          <input
            id="player-name"
            className="text-input"
            value={name}
            maxLength={12}
            onChange={(event) => setName(event.target.value)}
            placeholder="旅の名前"
          />
        </div>

        <div className="field">
          <p className="field__label">理想の自分</p>
          <div className="option-grid">
            {goalOptions.map((goal) => (
              <button
                key={goal.id}
                type="button"
                className={`goal-card ${selectedGoalId === goal.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedGoalId(goal.id)}
              >
                <div className={`goal-card__crest goal-card__crest--${goal.accent}`}>
                  {goal.title.slice(0, 1)}
                </div>
                <strong>{goal.title}</strong>
                <span>{goal.subtitle}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <div className="field__row">
            <p className="field__label">連れていく習慣</p>
            <span className="field__hint">1〜3個まで</span>
          </div>

          <div className="habit-choice-list">
            {habitLibrary.map((habit) => {
              const selected = selectedHabitIds.includes(habit.id);
              return (
                <button
                  key={habit.id}
                  type="button"
                  className={`habit-choice ${selected ? 'is-selected' : ''}`}
                  onClick={() => toggleHabit(habit.id)}
                >
                  <div>
                    <strong>{habit.title}</strong>
                    <p>{habit.category}</p>
                  </div>
                  <div className="habit-choice__gain">
                    +{habit.rewardMeters}m
                    {habit.rewardFood > 0 ? ` / 食料 +${habit.rewardFood}` : ''}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="conversion-card">
          <p className="conversion-card__eyebrow">山道への変換</p>
          <h2>{selectedGoal.destination}</h2>
          <p>{selectedGoal.description}</p>
          <ul className="conversion-list">
            {selectedHabitIds.map((habitId) => {
              const habit = habitLibrary.find((item) => item.id === habitId);
              if (!habit) {
                return null;
              }

              return (
                <li key={habit.id}>
                  <span>{habit.title}</span>
                  <strong>
                    +{habit.rewardMeters}m
                    {habit.rewardFood > 0 ? ` / 食料 +${habit.rewardFood}` : ''}
                  </strong>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <button
        type="button"
        className="primary-button primary-button--hero"
        disabled={selectedHabitIds.length === 0}
        onClick={() =>
          onComplete({
            name,
            goalId: selectedGoalId,
            habitIds: selectedHabitIds,
          })
        }
      >
        仲間と山登りを始める
      </button>
    </div>
  );
}
