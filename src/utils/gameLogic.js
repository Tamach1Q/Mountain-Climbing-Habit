import {
  buildSelectedHabits,
  createInitialUser,
  createPartyMembers,
  createSupportHistory,
  goalOptions,
} from '../data/gameContent';

export const STORAGE_KEY = 'mountain-climbing-habit-mvp-v1';
export const MAX_TRAIL_METERS = 1600;

export const STATUS_META = {
  normal: {
    label: '順調',
    shortLabel: '順調',
    helpCost: 0,
    message: '穏やかに歩けています。',
  },
  tired: {
    label: '疲れている',
    shortLabel: '疲れ',
    helpCost: 1,
    message: 'ひと息つけば、また進めそうです。',
  },
  stumbling: {
    label: 'つまずき中',
    shortLabel: 'つまずき',
    helpCost: 2,
    message: '立て直すための支えが必要です。',
  },
};

const STATE_VERSION = 1;

const TRAIL_POINTS = [
  { progress: 0, x: 42, y: 518 },
  { progress: 220, x: 92, y: 468 },
  { progress: 420, x: 80, y: 396 },
  { progress: 680, x: 156, y: 330 },
  { progress: 940, x: 146, y: 246 },
  { progress: 1220, x: 226, y: 170 },
  { progress: 1600, x: 286, y: 74 },
];

function createFlash(tone, title, message) {
  return { tone, title, message };
}

export function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function syncMemberPosition(member) {
  return {
    ...member,
    positionOnTrail: Math.round(
      Math.max(0, Math.min(100, (member.progressMeters / MAX_TRAIL_METERS) * 100)),
    ),
  };
}

function syncPartyMembers(partyMembers) {
  return partyMembers.map(syncMemberPosition);
}

function deriveHabitsFromLogs(habits, dailyLogs) {
  const completedToday = new Set(
    dailyLogs
      .filter((log) => dateKey(new Date(log.completedAt)) === dateKey())
      .map((log) => log.habitId),
  );

  return habits.map((habit) => ({
    ...habit,
    completedToday: completedToday.has(habit.id),
  }));
}

export function createFreshState() {
  return {
    version: STATE_VERSION,
    isOnboarded: false,
    route: 'onboarding',
    user: createInitialUser(),
    partyMembers: syncPartyMembers(createPartyMembers()),
    dailyLogs: [],
    supportHistory: createSupportHistory(),
    flash: null,
  };
}

export function hydrateState() {
  if (typeof window === 'undefined') {
    return createFreshState();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createFreshState();
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STATE_VERSION) {
      return createFreshState();
    }

    return {
      ...parsed,
      route: parsed.isOnboarded ? parsed.route || 'home' : 'onboarding',
      user: {
        ...createInitialUser(),
        ...parsed.user,
        habits: deriveHabitsFromLogs(parsed.user?.habits || [], parsed.dailyLogs || []),
      },
      partyMembers: syncPartyMembers(parsed.partyMembers || []),
      dailyLogs: parsed.dailyLogs || [],
      supportHistory: parsed.supportHistory || [],
      flash: null,
    };
  } catch (error) {
    return createFreshState();
  }
}

function completeOnboarding(state, payload) {
  const goal = goalOptions.find((item) => item.id === payload.goalId) || goalOptions[0];
  const habits = buildSelectedHabits(payload.habitIds);
  const userName = payload.name?.trim() || 'ユウ';

  return {
    version: STATE_VERSION,
    isOnboarded: true,
    route: 'home',
    user: {
      ...createInitialUser(),
      name: userName,
      avatarStyle: goal.accent,
      goalTitle: goal.title,
      idealSelfId: goal.id,
      habits,
      progressMeters: 360,
      food: 3,
      streakDays: 4,
      status: 'normal',
    },
    partyMembers: syncPartyMembers(createPartyMembers()),
    dailyLogs: [],
    supportHistory: createSupportHistory(),
    flash: createFlash(
      'story',
      `${goal.destination}へ続く旅が始まりました`,
      `${habits.length}つの習慣が、あなたと仲間の山道を前に進めます。`,
    ),
  };
}

function recordHabit(state, habitId) {
  const targetHabit = state.user.habits.find((habit) => habit.id === habitId);
  if (!targetHabit) {
    return state;
  }

  if (targetHabit.completedToday) {
    return {
      ...state,
      flash: createFlash(
        'mist',
        '今日はもう刻んであります',
        `${targetHabit.title} は今日の一歩として記録済みです。`,
      ),
    };
  }

  const hasLoggedToday = state.dailyLogs.some(
    (log) => dateKey(new Date(log.completedAt)) === dateKey(),
  );

  const updatedHabits = state.user.habits.map((habit) =>
    habit.id === habitId ? { ...habit, completedToday: true } : habit,
  );

  const updatedUser = {
    ...state.user,
    habits: updatedHabits,
    progressMeters: state.user.progressMeters + targetHabit.rewardMeters,
    food: state.user.food + targetHabit.rewardFood,
    streakDays: state.user.streakDays + (hasLoggedToday ? 0 : 1),
  };

  const nextLog = {
    id: `log-${Date.now()}`,
    habitId: targetHabit.id,
    completedAt: new Date().toISOString(),
    rewardMeters: targetHabit.rewardMeters,
    rewardFood: targetHabit.rewardFood,
  };

  return {
    ...state,
    user: updatedUser,
    dailyLogs: [nextLog, ...state.dailyLogs],
    flash: createFlash(
      'summit',
      `${targetHabit.title} を記録しました`,
      `+${targetHabit.rewardMeters}m 前進${targetHabit.rewardFood > 0 ? ` / 食料 +${targetHabit.rewardFood}` : ''}`,
    ),
  };
}

function helpMember(state, memberId) {
  const member = state.partyMembers.find((item) => item.id === memberId);
  if (!member) {
    return state;
  }

  const helpCost = STATUS_META[member.status].helpCost;
  if (helpCost === 0) {
    return {
      ...state,
      flash: createFlash('leaf', `${member.name} は順調です`, 'いまは見守るだけで大丈夫です。'),
    };
  }

  if (state.user.food < helpCost) {
    return {
      ...state,
      flash: createFlash(
        'ember',
        '食料が足りません',
        `${member.name} を助けるには食料 ${helpCost} が必要です。`,
      ),
    };
  }

  const nextStatus = member.status === 'stumbling' ? 'tired' : 'normal';
  const recoveredMeters = member.status === 'stumbling' ? 60 : 35;

  const updatedMembers = state.partyMembers.map((item) =>
    item.id === memberId
      ? syncMemberPosition({
          ...item,
          status: nextStatus,
          food: item.food + helpCost,
          progressMeters: item.progressMeters + recoveredMeters,
          note:
            nextStatus === 'normal'
              ? '足取りが落ち着き、また同じ道を進めています。'
              : '少し呼吸が整い、歩き出す準備ができました。',
        })
      : item,
  );

  const nextSupportHistory = [
    {
      id: `support-${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      direction: 'gave',
      amount: helpCost,
      summary:
        nextStatus === 'normal'
          ? `${member.name} に食料を分け、足取りを立て直した`
          : `${member.name} を支え、もう一度歩き出せるようにした`,
      createdAt: new Date().toISOString(),
    },
    ...state.supportHistory,
  ];

  return {
    ...state,
    user: {
      ...state.user,
      food: state.user.food - helpCost,
    },
    partyMembers: updatedMembers,
    supportHistory: nextSupportHistory,
    flash: createFlash(
      'leaf',
      `${member.name} を助けました`,
      `食料 -${helpCost}。${STATUS_META[nextStatus].label} まで回復し、少し前に進みました。`,
    ),
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_ONBOARDING':
      return completeOnboarding(state, action.payload);
    case 'NAVIGATE':
      return {
        ...state,
        route: action.payload,
      };
    case 'RECORD_HABIT':
      return recordHabit(state, action.payload);
    case 'HELP_MEMBER':
      return helpMember(state, action.payload);
    case 'DISMISS_FLASH':
      return {
        ...state,
        flash: null,
      };
    default:
      return state;
  }
}

export function getTodayMeters(dailyLogs) {
  return dailyLogs
    .filter((log) => dateKey(new Date(log.completedAt)) === dateKey())
    .reduce((sum, log) => sum + log.rewardMeters, 0);
}

export function getTodayFood(dailyLogs) {
  return dailyLogs
    .filter((log) => dateKey(new Date(log.completedAt)) === dateKey())
    .reduce((sum, log) => sum + log.rewardFood, 0);
}

export function getNeedHelpMembers(partyMembers) {
  return partyMembers.filter((member) => member.status !== 'normal');
}

export function getTrailPosition(progressMeters) {
  const clamped = Math.max(0, Math.min(progressMeters, MAX_TRAIL_METERS));

  for (let index = 0; index < TRAIL_POINTS.length - 1; index += 1) {
    const current = TRAIL_POINTS[index];
    const next = TRAIL_POINTS[index + 1];

    if (clamped >= current.progress && clamped <= next.progress) {
      const span = next.progress - current.progress;
      const ratio = span === 0 ? 0 : (clamped - current.progress) / span;
      return {
        left: current.x + (next.x - current.x) * ratio,
        top: current.y + (next.y - current.y) * ratio,
      };
    }
  }

  const peak = TRAIL_POINTS[TRAIL_POINTS.length - 1];
  return {
    left: peak.x,
    top: peak.y,
  };
}

export function formatRelativeTime(dateString) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < minute) {
    return 'たった今';
  }

  if (diff < hour) {
    return `${Math.floor(diff / minute)}分前`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}時間前`;
  }

  return `${Math.floor(diff / day)}日前`;
}

export function formatLogTime(dateString) {
  return new Date(dateString).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
