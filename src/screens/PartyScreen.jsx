import { ScreenHeader } from '../components/ScreenHeader';
import { StatusPill } from '../components/StatusPill';
import { MAX_TRAIL_METERS, formatRelativeTime } from '../utils/gameLogic';

export function PartyScreen({ user, partyMembers, supportHistory }) {
  const members = [
    {
      id: user.id,
      name: `${user.name} (あなた)`,
      progressMeters: user.progressMeters,
      food: user.food,
      status: user.status,
      positionOnTrail: Math.round(
        Math.max(0, Math.min(100, (user.progressMeters / MAX_TRAIL_METERS) * 100)),
      ),
    },
    ...partyMembers,
  ].sort((a, b) => b.progressMeters - a.progressMeters);

  return (
    <div className="stacked-screen">
      <ScreenHeader
        eyebrow="仲間一覧"
        title="パーティーの足並み"
        description="競争ではなく、いま誰がどのあたりにいて、どんな様子かを見るための一覧です。"
      />

      <section className="party-map">
        <div className="party-map__line" />
        {members.map((member) => (
          <div
            key={member.id}
            className="party-map__node"
            style={{ top: `${100 - member.positionOnTrail}%` }}
          >
            <div className="party-map__dot" />
            <div className="party-map__label">
              <strong>{member.name}</strong>
              <span>{member.progressMeters}m</span>
            </div>
          </div>
        ))}
      </section>

      <section className="stack-list">
        {members.map((member) => {
          const recentSupport = supportHistory.find((item) => item.memberId === member.id);

          return (
            <article key={member.id} className="party-card">
              <div className="party-card__top">
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.progressMeters}m 地点を歩いています</p>
                </div>
                <StatusPill status={member.status} />
              </div>

              <div className="party-card__meta">
                <span>食料 {member.food}</span>
                <span>道の位置 {member.positionOnTrail}%</span>
              </div>

              <p className="party-card__history">
                {recentSupport
                  ? `${recentSupport.summary} / ${formatRelativeTime(recentSupport.createdAt)}`
                  : '最近の助け合い記録はまだありません。'}
              </p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
