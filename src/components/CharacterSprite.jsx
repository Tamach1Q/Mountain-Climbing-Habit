const spriteToneMap = {
  sky: {
    background: 'linear-gradient(180deg, #dbeff4 0%, #86b6c7 100%)',
    ring: '#eff8fb',
  },
  moss: {
    background: 'linear-gradient(180deg, #d9ebcb 0%, #8db18c 100%)',
    ring: '#f6fbf1',
  },
  dawn: {
    background: 'linear-gradient(180deg, #f4d8d8 0%, #d69084 100%)',
    ring: '#fff5f2',
  },
  leaf: {
    background: 'linear-gradient(180deg, #d9ecd0 0%, #7b9f73 100%)',
    ring: '#f9fcf5',
  },
  stone: {
    background: 'linear-gradient(180deg, #e7ddcf 0%, #b19979 100%)',
    ring: '#fbf6ef',
  },
  sun: {
    background: 'linear-gradient(180deg, #f6deb6 0%, #d8a15c 100%)',
    ring: '#fff8ef',
  },
};

export function CharacterSprite({ member, position, isUser = false }) {
  const tone = spriteToneMap[member.avatarStyle] || spriteToneMap.sky;
  const sizeClass = isUser ? 'sprite--user' : '';

  return (
    <div
      className={`sprite ${sizeClass} sprite--${member.status}`}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
    >
      <div className="sprite__shadow" />
      <div
        className="sprite__body"
        style={{
          background: tone.background,
          boxShadow: `0 0 0 4px ${tone.ring}`,
        }}
      >
        <span>{member.name.slice(0, 1)}</span>
      </div>

      {member.status !== 'normal' ? (
        <div className={`sprite__status sprite__status--${member.status}`}>
          {member.status === 'stumbling' ? '!' : '...'}
        </div>
      ) : null}

      <div className={`sprite__label ${isUser ? 'sprite__label--user' : ''}`}>
        <strong>{isUser ? 'あなた' : member.name}</strong>
      </div>
    </div>
  );
}
