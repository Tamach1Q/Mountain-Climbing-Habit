export const goalOptions = [
  {
    id: 'explorer',
    title: '探検家の朝',
    subtitle: '新しい景色へ踏み出す人',
    description: '迷いの朝も、一歩ずつ道に変えていく旅人です。',
    accent: 'sky',
    destination: '霧晴れの峠',
  },
  {
    id: 'scholar',
    title: '学びを積む案内人',
    subtitle: '静かに知を重ねる人',
    description: '小さな集中を積み重ね、山道に確かな足場をつくります。',
    accent: 'moss',
    destination: '知恵の尾根',
  },
  {
    id: 'artist',
    title: '感性を描く旅人',
    subtitle: '毎日に彩りを灯す人',
    description: '気づきや表現が、仲間の歩幅までやさしく照らします。',
    accent: 'dawn',
    destination: '灯りの稜線',
  },
];

export const habitLibrary = [
  {
    id: 'walk',
    title: '朝の散歩 10分',
    category: 'からだ',
    rewardMeters: 90,
    rewardFood: 1,
  },
  {
    id: 'stretch',
    title: 'ストレッチ',
    category: 'からだ',
    rewardMeters: 70,
    rewardFood: 0,
  },
  {
    id: 'journal',
    title: '夜のふり返り',
    category: 'こころ',
    rewardMeters: 65,
    rewardFood: 1,
  },
  {
    id: 'read',
    title: '読書 20分',
    category: 'まなび',
    rewardMeters: 110,
    rewardFood: 1,
  },
  {
    id: 'sleep',
    title: '23時までに眠る',
    category: 'くらし',
    rewardMeters: 120,
    rewardFood: 1,
  },
  {
    id: 'water',
    title: '水をしっかり飲む',
    category: 'くらし',
    rewardMeters: 50,
    rewardFood: 0,
  },
];

const starterPartyMembers = [
  {
    id: 'hana',
    name: 'ハナ',
    avatarStyle: 'leaf',
    progressMeters: 640,
    food: 2,
    status: 'normal',
    note: '尾根の先でペースよく進んでいます。',
  },
  {
    id: 'maki',
    name: 'マキ',
    avatarStyle: 'stone',
    progressMeters: 520,
    food: 0,
    status: 'stumbling',
    note: '足を取られて立て直し中です。',
  },
  {
    id: 'sou',
    name: 'ソウ',
    avatarStyle: 'sun',
    progressMeters: 430,
    food: 1,
    status: 'tired',
    note: '呼吸を整えながら歩いています。',
  },
];

const starterSupportHistory = [
  {
    id: 'seed-support-1',
    memberId: 'hana',
    memberName: 'ハナ',
    direction: 'received',
    amount: 1,
    summary: 'ハナが朝の温かい飲み物を分けてくれた',
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: 'seed-support-2',
    memberId: 'sou',
    memberName: 'ソウ',
    direction: 'gave',
    amount: 1,
    summary: '昨日、ソウに食料を渡して呼吸を整えた',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
];

const defaultHabitIds = ['walk', 'stretch', 'journal'];

export function buildSelectedHabits(selectedIds = defaultHabitIds) {
  return selectedIds
    .map((habitId) => habitLibrary.find((habit) => habit.id === habitId))
    .filter(Boolean)
    .map((habit) => ({
      ...habit,
      completedToday: false,
    }));
}

export function createInitialUser() {
  return {
    id: 'user',
    name: 'ユウ',
    avatarStyle: 'sky',
    goalTitle: '',
    idealSelfId: '',
    habits: [],
    progressMeters: 360,
    food: 3,
    streakDays: 4,
    status: 'normal',
  };
}

export function createPartyMembers() {
  return starterPartyMembers.map((member) => ({ ...member }));
}

export function createSupportHistory() {
  return starterSupportHistory.map((item) => ({ ...item }));
}
