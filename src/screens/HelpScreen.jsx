import { ScreenHeader } from '../components/ScreenHeader';
import { StatusPill } from '../components/StatusPill';
import { STATUS_META } from '../utils/gameLogic';

export function HelpScreen({ user, needyMembers, onHelp, onNavigate }) {
  return (
    <div className="stacked-screen">
      <ScreenHeader
        eyebrow="助ける"
        title="食料を分けて、歩き直せるようにする"
        description="この画面の中心は支援です。数値よりも、また同じ道に戻れることを優先します。"
        action={<span className="header-chip">食料 {user.food}</span>}
      />

      {needyMembers.length === 0 ? (
        <section className="empty-panel">
          <strong>いま助けが必要な仲間はいません</strong>
          <p>全員が同じ道を進めています。今日は自分の記録を重ねる時間にできます。</p>
        </section>
      ) : (
        <section className="stack-list">
          {needyMembers.map((member) => {
            const helpCost = STATUS_META[member.status].helpCost;
            const canHelp = user.food >= helpCost;

            return (
              <article key={member.id} className="help-card">
                <div className="help-card__row">
                  <div>
                    <p className="help-card__eyebrow">同じ道の仲間</p>
                    <h3>{member.name}</h3>
                    <p>{member.note}</p>
                  </div>
                  <StatusPill status={member.status} />
                </div>

                <div className="help-card__stats">
                  <span>必要な食料 {helpCost}</span>
                  <span>現在地 {member.progressMeters}m</span>
                </div>

                <button
                  type="button"
                  className="primary-button"
                  disabled={!canHelp}
                  onClick={() => onHelp(member.id)}
                >
                  {canHelp ? `${member.name} に食料を渡す` : '食料が足りません'}
                </button>
              </article>
            );
          })}
        </section>
      )}

      <button type="button" className="secondary-button" onClick={() => onNavigate('home')}>
        山ホームに戻る
      </button>
    </div>
  );
}
