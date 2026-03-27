export function ScreenHeader({ eyebrow, title, description, action }) {
  return (
    <header className="screen-header">
      <div>
        {eyebrow ? <p className="screen-header__eyebrow">{eyebrow}</p> : null}
        <h1 className="screen-header__title">{title}</h1>
        {description ? <p className="screen-header__description">{description}</p> : null}
      </div>
      {action ? <div className="screen-header__action">{action}</div> : null}
    </header>
  );
}
