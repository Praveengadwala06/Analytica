/**
 * Centralized mock data generator for user-specific mock data per page
 */

function hashStringToNumber(str) {
  return str
    ? str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : 0;
}

export function generateMockData(userId, page) {
  const userHash = hashStringToNumber(userId);

  switch (page) {
    case 'ReportsHome':
      return generateReportsHomeData(userId, userHash);
    case 'InternalPerformance':
      return generateInternalPerformanceData(userId, userHash);
    case 'PostPerformance':
      return generatePostPerformanceData(userId, userHash);
    case 'FacebookCompetitors':
      return generateFacebookCompetitorsData(userId, userHash);
    // Add cases for other pages as needed
    default:
      return {};
  }
}

function generateFacebookCompetitorsData(userId, userHash) {
  const baseCompetitors = [
    {
      id: 1,
      name: 'Facebook Competitor One',
      handle: 'fbcompetitor1',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
      friends: 15000,
      posts: 1200,
      bio: 'Leading competitor in social media.',
      location: 'Menlo Park, CA',
    },
    {
      id: 2,
      name: 'Facebook Competitor Two',
      handle: 'fbcompetitor2',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      friends: 13000,
      posts: 1100,
      bio: 'Innovative social platform.',
      location: 'New York, NY',
    },
    {
      id: 3,
      name: 'Facebook Competitor Three',
      handle: 'fbcompetitor3',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
      friends: 14000,
      posts: 1150,
      bio: 'Global leader in social networking.',
      location: 'Chicago, IL',
    },
    {
      id: 4,
      name: 'Facebook Competitor Four',
      handle: 'fbcompetitor4',
      avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
      friends: 12500,
      posts: 1050,
      bio: 'Top social media strategist.',
      location: 'Austin, TX',
    },
  ];

  // Modify friends and posts counts based on userHash for uniqueness
  return baseCompetitors.map((competitor) => ({
    ...competitor,
    id: competitor.id + userHash,
    friends: competitor.friends + (userHash % 1000),
    posts: competitor.posts + (userHash % 100),
    name: `${competitor.name} - User ${userId.substring(0, 6)}`,
    bio: `${competitor.bio} (Personalized for user ${userId.substring(0, 6)})`,
  }));
}

function generateTwitterCompetitorsData(userId, userHash) {
  const baseCompetitors = [
    {
      id: 1,
      name: 'Competitor One',
      handle: '@competitor1',
      avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
      followers: 15000,
      tweets: 1200,
      bio: 'Leading competitor in tech industry.',
      location: 'San Francisco, CA',
    },
    {
      id: 2,
      name: 'Competitor Two',
      handle: '@competitor2',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      followers: 13000,
      tweets: 1100,
      bio: 'Innovative solutions provider.',
      location: 'New York, NY',
    },
    {
      id: 3,
      name: 'Competitor Three',
      handle: '@competitor3',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
      followers: 14000,
      tweets: 1150,
      bio: 'Global leader in marketing.',
      location: 'Chicago, IL',
    },
    {
      id: 4,
      name: 'Competitor Four',
      handle: '@competitor4',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
      followers: 12500,
      tweets: 1050,
      bio: 'Top social media strategist.',
      location: 'Austin, TX',
    },
  ];

  // Modify followers and tweets counts based on userHash for uniqueness
  return baseCompetitors.map((competitor) => ({
    ...competitor,
    id: competitor.id + userHash,
    followers: competitor.followers + (userHash % 1000),
    tweets: competitor.tweets + (userHash % 100),
    name: `${competitor.name} - User ${userId.substring(0, 6)}`,
    bio: `${competitor.bio} (Personalized for user ${userId.substring(0, 6)})`,
  }));
}

function generateLinkedInCompetitorsData(userId, userHash) {
  const baseCompetitors = [
    {
      id: 1,
      name: 'LinkedIn Competitor One',
      handle: 'licompetitor1',
      avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
      connections: 5000,
      posts: 500,
      bio: 'Professional networking leader.',
      location: 'New York, NY',
    },
    {
      id: 2,
      name: 'LinkedIn Competitor Two',
      handle: 'licompetitor2',
      avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
      connections: 4500,
      posts: 450,
      bio: 'Career development experts.',
      location: 'San Francisco, CA',
    },
    {
      id: 3,
      name: 'LinkedIn Competitor Three',
      handle: 'licompetitor3',
      avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
      connections: 4800,
      posts: 470,
      bio: 'Global business network.',
      location: 'Chicago, IL',
    },
    {
      id: 4,
      name: 'LinkedIn Competitor Four',
      handle: 'licompetitor4',
      avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
      connections: 4300,
      posts: 420,
      bio: 'Top recruiters and HR specialists.',
      location: 'Austin, TX',
    },
  ];

  // Modify connections and posts counts based on userHash for uniqueness
  return baseCompetitors.map((competitor) => ({
    ...competitor,
    id: competitor.id + userHash,
    connections: competitor.connections + (userHash % 1000),
    posts: competitor.posts + (userHash % 100),
    name: `${competitor.name} - User ${userId.substring(0, 6)}`,
    bio: `${competitor.bio} (Personalized for user ${userId.substring(0, 6)})`,
  }));
}

function generateInstagramCompetitorsData(userId, userHash) {
  const baseCompetitors = [
    {
      id: 1,
      name: 'Instagram Competitor One',
      handle: '@igcompetitor1',
      avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
      followers: 25000,
      posts: 3200,
      bio: 'Top influencer marketing agency.',
      location: 'Los Angeles, CA',
    },
    {
      id: 2,
      name: 'Instagram Competitor Two',
      handle: '@igcompetitor2',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      followers: 23000,
      posts: 3100,
      bio: 'Creative content creators.',
      location: 'New York, NY',
    },
    {
      id: 3,
      name: 'Instagram Competitor Three',
      handle: '@igcompetitor3',
      avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
      followers: 24000,
      posts: 3150,
      bio: 'Leading social media strategists.',
      location: 'Chicago, IL',
    },
    {
      id: 4,
      name: 'Instagram Competitor Four',
      handle: '@igcompetitor4',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      followers: 22500,
      posts: 3050,
      bio: 'Innovative brand marketers.',
      location: 'Austin, TX',
    },
  ];

  // Modify followers and posts counts based on userHash for uniqueness
  return baseCompetitors.map((competitor) => ({
    ...competitor,
    id: competitor.id + userHash,
    followers: competitor.followers + (userHash % 1000),
    posts: competitor.posts + (userHash % 100),
    name: `${competitor.name} - User ${userId.substring(0, 6)}`,
    bio: `${competitor.bio} (Personalized for user ${userId.substring(0, 6)})`,
  }));
}

function generateReportsHomeData(userId, userHash) {
  const baseReports = [
    {
      id: 1,
      title: 'October 2023 Performance',
      date: '2023-10-31',
      summary: 'Summary of social media performance for October 2023.',
    },
    {
      id: 2,
      title: 'Q3 2023 Report',
      date: '2023-09-30',
      summary: 'Quarter 3 report covering July to September 2023.',
    },
    {
      id: 3,
      title: 'Custom Report: Influencer Campaign',
      date: '2023-10-15',
      summary: 'Performance analysis of influencer marketing campaign.',
    },
  ];

  return baseReports.map((report) => ({
    ...report,
    id: report.id + userHash,
    title: `${report.title} - User ${userId.substring(0, 6)}`,
    summary: `${report.summary} (Personalized for user ${userId.substring(0, 6)})`,
  }));
}

function generateInternalPerformanceData(userId, userHash) {
  // Generate line chart data with variation based on userHash
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const revenueBase = 12000 + (userHash % 5000);
  const revenueData = labels.map((_, i) => revenueBase + i * 1000 + (userHash % 1000));

  const productSalesBase = 5000 + (userHash % 3000);
  const productSalesData = [productSalesBase, productSalesBase + 2000, productSalesBase - 1000, productSalesBase + 1000];

  const trafficBase = 3000 + (userHash % 2000);
  const trafficData = [trafficBase, trafficBase / 2, trafficBase / 3, trafficBase * 1.5];

  return {
    lineData: {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    },
    barData: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      datasets: [
        {
          label: 'Sales',
          data: productSalesData,
          backgroundColor: ['#4F46E5', '#3B82F6', '#60A5FA', '#93C5FD'],
        },
      ],
    },
    pieData: {
      labels: ['Direct', 'Referral', 'Social', 'Organic'],
      datasets: [
        {
          label: 'Traffic Sources',
          data: trafficData,
          backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'],
          hoverOffset: 30,
        },
      ],
    },
    metrics: {
      totalRevenue: 120000 + (userHash % 10000),
      newCustomers: 1200 + (userHash % 300),
      supportTickets: 320 + (userHash % 50),
      churnRate: 2.5 - (userHash % 10) * 0.01,
    },
  };
}

function generatePostPerformanceData(userId, userHash) {
  const postsList = ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5'];

  // Generate data arrays with variation based on userHash
  const engagementsBase = 1000 + (userHash % 2000);
  const clicksBase = 800 + (userHash % 1500);

  const engagementsData = postsList.map((_, i) => engagementsBase + i * 500 + (userHash % 300));
  const clicksData = postsList.map((_, i) => clicksBase + i * 400 + (userHash % 200));

  return {
    postsList,
    data: {
      labels: postsList,
      datasets: [
        {
          label: 'Engagements',
          data: engagementsData,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          type: 'bar',
        },
        {
          label: 'Clicks',
          data: clicksData,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderWidth: 2,
          fill: false,
          type: 'line',
          tension: 0.3,
        },
      ],
    },
  };
}
