const items = [
  { key: 'home', label: '山ホーム', mark: '山' },
  { key: 'record', label: '記録', mark: '記' },
  { key: 'help', label: '助ける', mark: '助' },
  { key: 'party', label: '仲間', mark: '仲' },
  { key: 'profile', label: 'マイ', mark: '私' },
];

export function BottomNav({ route, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="メインナビゲーション">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`bottom-nav__item ${route === item.key ? 'is-active' : ''}`}
          onClick={() => onNavigate(item.key)}
        >
          <span className="bottom-nav__mark">{item.mark}</span>
          <span className="bottom-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
