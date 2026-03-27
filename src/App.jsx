import { useEffect, useMemo, useReducer } from 'react';
import { AppShell } from './components/AppShell';
import { MountainHomeScreen } from './screens/MountainHomeScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { PartyScreen } from './screens/PartyScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { RecordScreen } from './screens/RecordScreen';
import { HelpScreen } from './screens/HelpScreen';
import {
  STORAGE_KEY,
  gameReducer,
  getNeedHelpMembers,
  getTodayFood,
  getTodayMeters,
  hydrateState,
} from './utils/gameLogic';

function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, hydrateState);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const needyMembers = useMemo(
    () => getNeedHelpMembers(state.partyMembers),
    [state.partyMembers],
  );
  const todayMeters = useMemo(() => getTodayMeters(state.dailyLogs), [state.dailyLogs]);
  const todayFood = useMemo(() => getTodayFood(state.dailyLogs), [state.dailyLogs]);

  const navigate = (route) => dispatch({ type: 'NAVIGATE', payload: route });
  const dismissFlash = () => dispatch({ type: 'DISMISS_FLASH' });

  let screen = null;
  if (!state.isOnboarded || state.route === 'onboarding') {
    screen = (
      <OnboardingScreen
        onComplete={(payload) =>
          dispatch({ type: 'COMPLETE_ONBOARDING', payload })
        }
      />
    );
  } else if (state.route === 'record') {
    screen = (
      <RecordScreen
        user={state.user}
        todayMeters={todayMeters}
        todayFood={todayFood}
        onRecord={(habitId) => dispatch({ type: 'RECORD_HABIT', payload: habitId })}
        onNavigate={navigate}
      />
    );
  } else if (state.route === 'help') {
    screen = (
      <HelpScreen
        user={state.user}
        needyMembers={needyMembers}
        onHelp={(memberId) => dispatch({ type: 'HELP_MEMBER', payload: memberId })}
        onNavigate={navigate}
      />
    );
  } else if (state.route === 'party') {
    screen = (
      <PartyScreen
        user={state.user}
        partyMembers={state.partyMembers}
        supportHistory={state.supportHistory}
      />
    );
  } else if (state.route === 'profile') {
    screen = <ProfileScreen user={state.user} dailyLogs={state.dailyLogs} />;
  } else {
    screen = (
      <MountainHomeScreen
        user={state.user}
        partyMembers={state.partyMembers}
        todayMeters={todayMeters}
        onNavigate={navigate}
        needyMembers={needyMembers}
      />
    );
  }

  return (
    <AppShell
      route={state.route}
      user={state.user}
      todayMeters={todayMeters}
      onNavigate={navigate}
      showNavigation={state.isOnboarded && state.route !== 'onboarding'}
      flash={state.flash}
      onDismissFlash={dismissFlash}
    >
      {screen}
    </AppShell>
  );
}

export default App;
