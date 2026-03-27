import { CharacterSprite } from './CharacterSprite';
import { getNeedHelpMembers, getTrailPosition } from '../utils/gameLogic';

export function TrailScene({ user, partyMembers, goalTitle }) {
  const allMembers = [
    { ...user, isUser: true },
    ...partyMembers.map((member) => ({ ...member, isUser: false })),
  ];
  const needHelpMembers = getNeedHelpMembers(partyMembers);

  return (
    <section className="trail-scene" aria-label="山道のシーン">
      <div className="trail-scene__mist trail-scene__mist--back" />
      <div className="trail-scene__mist trail-scene__mist--front" />

      <div className="trail-scene__sky">
        <div className="trail-scene__sun" />
        <div className="trail-scene__peak-label">
          <span className="trail-scene__peak-caption">目指す稜線</span>
          <strong>{goalTitle}</strong>
        </div>
      </div>

      <div className="trail-scene__mountain trail-scene__mountain--far" />
      <div className="trail-scene__mountain trail-scene__mountain--mid" />
      <div className="trail-scene__forest" />

      <svg
        className="trail-scene__path"
        viewBox="0 0 320 560"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M32 524 C 76 486 92 466 78 396 C 82 368 126 352 156 330 C 156 300 118 250 146 244 C 198 206 190 204 228 172 C 252 140 280 118 288 76"
          pathLength="100"
          stroke="rgba(99, 83, 53, 0.13)"
          strokeWidth="34"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M32 524 C 76 486 92 466 78 396 C 82 368 126 352 156 330 C 156 300 118 250 146 244 C 198 206 190 204 228 172 C 252 140 280 118 288 76"
          pathLength="100"
          stroke="#f3e3bc"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M32 524 C 76 486 92 466 78 396 C 82 368 126 352 156 330 C 156 300 118 250 146 244 C 198 206 190 204 228 172 C 252 140 280 118 288 76"
          pathLength="100"
          stroke="#cda874"
          strokeWidth="4"
          strokeDasharray="1 5"
          fill="none"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>

      <div className="trail-scene__sprites">
        {allMembers.map((member) => (
          <CharacterSprite
            key={member.id}
            member={member}
            position={getTrailPosition(member.progressMeters)}
            isUser={member.isUser}
          />
        ))}
      </div>

      <div className="trail-scene__summary">
        <div className="scene-chip">
          <span>同じ山道</span>
          <strong>{allMembers.length}人で進行中</strong>
        </div>
        <div className="scene-chip scene-chip--alert">
          <span>助けが必要</span>
          <strong>{needHelpMembers.length}人</strong>
        </div>
      </div>
    </section>
  );
}
