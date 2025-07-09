export const generateMockData = (userId, insightsType) => {
  const baseLikes = 1500000;
  const baseViews = 40000;
  const baseEngagement = 40000;
  const baseReached = 40000;

  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  const hash = userId ? hashCode(userId) : 0;

  const variation = (num) => Math.floor(num * (0.8 + (hash % 40) / 100));

  const generateMonthlyData = (variation) => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    views: [36000, 25000, 29000, 37000, 40000, 28000, 26000, 23000, 24000, 22000, 21000, 20000].map(v => variation(v)),
    followers: [25000, 32000, 27000, 34000, 33000, 29000, 27000, 26000, 25000, 24000, 23000, 22000].map(v => variation(v)),
  });

  const generateWeeklyData = (variation) => ({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    views: [9000, 8000, 8500, 8700].map(v => variation(v)),
    followers: [6000, 7000, 6500, 6700].map(v => variation(v)),
  });

  const generateDailyData = (variation) => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    views: [1200, 1300, 1250, 1400, 1350, 1100, 1150].map(v => variation(v)),
    followers: [800, 900, 850, 950, 900, 700, 750].map(v => variation(v)),
  });

  let insights;
  switch (insightsType) {
    case 'Weekly':
      insights = generateWeeklyData(variation);
      break;
    case 'Daily':
      insights = generateDailyData(variation);
      break;
    case 'Monthly':
    default:
      insights = generateMonthlyData(variation);
      break;
  }

  let totalViewsValue = variation(baseViews);
  let totalLikesValue = Math.floor(totalViewsValue / 5);

  // New followers mock data added here
  const newFollowers = [
    {
      id: 1,
      name: 'Alice Johnson',
      profilePhoto: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      id: 2,
      name: 'Bob Smith',
      profilePhoto: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      id: 3,
      name: 'Carol White',
      profilePhoto: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    {
      id: 4,
      name: 'David Brown',
      profilePhoto: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    {
      id: 5,
      name: 'Eva Green',
      profilePhoto: 'https://randomuser.me/api/portraits/women/25.jpg',
    },
  ];

  return {
    accountsReached: Math.floor(totalViewsValue / 3).toLocaleString() + 'k',
    accountsEngagement: Math.floor(totalLikesValue / 3).toLocaleString() + 'k',
    totalLikes: totalLikesValue.toLocaleString() + 'k',
    totalViews: totalViewsValue.toLocaleString() + 'k',
    likesPercent: 70 + (hash % 30),
    commentsPercent: 50 + (hash % 30),
    sharePercent: 40 + (hash % 30),
    insights,
    postActivity: [
      {
        post: 'Avail 35% off',
        status: 'Active',
        likes: variation(1807),
        impression: variation(2689),
        comments: variation(8707),
        image: 'https://via.placeholder.com/40',
      },
      {
        post: 'Winter Collection',
        status: 'Active',
        likes: variation(3807),
        impression: variation(5689),
        comments: variation(8707),
        image: 'https://via.placeholder.com/40',
      },
      {
        post: 'New Arrival',
        status: 'Active',
        likes: variation(3807),
        impression: variation(5689),
        comments: variation(8707),
        image: 'https://via.placeholder.com/40',
      },
    ],
    newFollowers, // added newFollowers array here
  };
};
