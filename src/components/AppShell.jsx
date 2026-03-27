import { BottomNav } from './BottomNav';
import { TopHUD } from './TopHUD';

const flashToneTitles = {
  summit: 'flash--summit',
  leaf: 'flash--leaf',
  story: 'flash--story',
  mist: 'flash--mist',
  ember: 'flash--ember',
};

export function AppShell({
  children,
  route,
  user,
  todayMeters,
  onNavigate,
  showNavigation = true,
  flash,
  onDismissFlash,
}) {
  return (
    <div className="app-shell">
      <div className={`phone-shell phone-shell--${route}`}>
        {showNavigation ? <TopHUD user={user} todayMeters={todayMeters} route={route} /> : null}

        {flash ? (
          <button
            type="button"
            className={`flash ${flashToneTitles[flash.tone] || ''}`}
            onClick={onDismissFlash}
          >
            <div>
              <strong>{flash.title}</strong>
              <p>{flash.message}</p>
            </div>
            <span className="flash__close">閉じる</span>
          </button>
        ) : null}

        <main className={`screen screen--${route} ${showNavigation ? '' : 'screen--full'}`}>
          {children}
        </main>

        {showNavigation ? <BottomNav route={route} onNavigate={onNavigate} /> : null}
      </div>
    </div>
  );
}
