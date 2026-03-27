import { ScreenHeader } from '../components/ScreenHeader';
import { TrailScene } from '../components/TrailScene';
import { StatusPill } from '../components/StatusPill';

export function MountainHomeScreen({
  user,
  partyMembers,
  todayMeters,
  onNavigate,
  needyMembers,
}) {
  const leadMember = needyMembers[0];

  return (
    <div className="home-screen">
      <ScreenHeader
        eyebrow="みんなの山道"
        title="同じ尾根を、一緒に進む"
        description="今日の行動が、自分だけでなく仲間の歩幅にもつながっています。"
      />

      <TrailScene user={user} partyMembers={partyMembers} goalTitle={user.goalTitle} />

      <section className="home-sheet">
        <div className="today-step-card">
          <div>
            <p className="today-step-card__label">今日の一歩</p>
            <strong>+{todayMeters}m</strong>
          </div>
          <div className="today-step-card__info">
            <span>食料 {user.food}</span>
            <span>連続 {user.streakDays}日</span>
          </div>
        </div>

        {leadMember ? (
          <button
            type="button"
            className="friend-alert"
            onClick={() => onNavigate('help')}
          >
            <div>
              <p className="friend-alert__eyebrow">仲間からの合図</p>
              <strong>{leadMember.name} が助けを待っています</strong>
              <p>{leadMember.note}</p>
            </div>
            <StatusPill status={leadMember.status} />
          </button>
        ) : (
          <div className="friend-alert friend-alert--quiet">
            <div>
              <p className="friend-alert__eyebrow">仲間の様子</p>
              <strong>いまは全員が順調です</strong>
              <p>今日は自分の一歩を積み重ねる時間にできます。</p>
            </div>
          </div>
        )}

        <div className="home-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => onNavigate('record')}
          >
            今日の行動を記録する
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate('help')}
          >
            仲間を助けに行く
          </button>
        </div>
      </section>
    </div>
  );
}
