export const PORTFOLIO_OWNER = {
  name: 'Samuel Kouřil',
  handle: 'samuel@portfolio',
  initials: 'SK',
  role: 'Software Engineer',
  tagline: 'Turning coffee into code',
  location: 'Zlín, Czech Republic',
  university: 'Tomas Bata University in Zlín (UTB)',
  upcoming: "Incoming Intern · St. Mary's University, San Antonio, TX",
  email: 'samuel.kouril@email.cz',
  githubUrl: 'https://github.com/godblessamki',
  githubHandle: 'github.com/godblessamki',
  instagramUrl: 'https://www.instagram.com/godblessamki/',
  instagramHandle: 'instagram.com/godblessamki',
};

export const PROJECTS = [
  {
    id: 'workout-tracker',
    index: '01',
    title: 'IronTrack',
    repoName: 'Workout-Tracker',
    date: 'Apr 2026',
    category: 'ios',
    categoryLabel: 'iOS & Mobile',
    summary:
      'Native iOS workout tracker built with SwiftUI and SwiftData. Create custom routines and exercises, and automatically surface your previous max weight and reps during active sessions.',
    architecture:
      'Built around a strict MVVM separation with local-first SwiftData persistence. Designed for zero-latency gym floor interactions with deterministic previous-set lookups, eliminating cloud dependency during workouts.',
    highlights: [
      'Automatic last-session max weight & rep recall inside active sets',
      'Local-first SwiftData schema with custom routine & exercise builders',
      '11 GitHub stars from the iOS developer community',
    ],
    tech: ['Swift', 'SwiftUI', 'SwiftData', 'MVVM', 'iOS'],
    starsLabel: '11 GitHub Stars',
    url: 'https://github.com/godblessamki/Workout-Tracker',
    accent: 'violet',
  },
  {
    id: 'ordering-system',
    index: '02',
    title: 'UTB.Minute',
    repoName: 'OrderingSystemMenza',
    date: 'Feb 2026',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Systems',
    summary:
      'Full-stack university canteen ordering system powered by .NET 10 Minimal APIs, Blazor WebAssembly, Keycloak auth, real-time SSE streams, and PostgreSQL.',
    architecture:
      'Orchestrated with .NET Aspire across distributed services. Uses System.Threading.Channels to broadcast concurrency-safe order state transitions over Server-Sent Events while EF Core + PostgreSQL enforce transactional inventory locks.',
    highlights: [
      '.NET 10 Minimal APIs paired with Blazor WebAssembly client',
      'Real-time SSE order updates backed by System.Threading.Channels',
      'Concurrency-safe ordering via EF Core + PostgreSQL & Keycloak SSO',
    ],
    tech: ['C#', '.NET 10', 'Blazor WASM', 'PostgreSQL', 'Keycloak', '.NET Aspire'],
    starsLabel: 'University Production System',
    url: 'https://github.com/Mofrus/OrderingSystemMenza',
    accent: 'indigo',
  },
  {
    id: 'f1-data',
    index: '03',
    title: 'F1DataCompare',
    repoName: 'F1DataCompare',
    date: 'Apr 2025',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary:
      'Formula 1 telemetry and race data comparison tool. Analyze and visualize lap-by-lap performance metrics across drivers, sessions, and seasons using real F1 data.',
    architecture:
      'Structured Python ingestion and normalization pipeline extracting speed traces, throttle/brake deltas, and stint pace from live Formula 1 APIs for side-by-side driver telemetry comparisons.',
    highlights: [
      'Multi-driver speed, gear, and sector delta comparison',
      'Session & season historical performance normalization',
      'Modular Python data pipeline built for reproducible race analysis',
    ],
    tech: ['Python', 'Data Analysis', 'F1 API'],
    starsLabel: 'Open-Source Telemetry',
    url: 'https://github.com/godblessamki/F1DataCompare',
    accent: 'cyan',
  },
];

export const SKILL_CATEGORIES = [
  {
    id: 'languages',
    label: 'Languages',
    summary: 'Strongly typed systems, scripting, and relational querying.',
    items: ['Python', 'Swift', 'C#', 'TypeScript', 'SQL'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    summary: 'Local-first native Apple interfaces and cross-platform builds.',
    items: ['SwiftUI', 'SwiftData', 'React Native'],
  },
  {
    id: 'backend',
    label: 'Backend',
    summary: 'Distributed service orchestration, APIs, and transactional storage.',
    items: ['.NET Aspire', 'Python', 'PostgreSQL'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    summary: 'Semantic web architecture, responsive styling, and modern UI.',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    id: 'tools',
    label: 'Tools & Interests',
    summary: 'Daily engineering environment and deep-dive curiosity areas.',
    items: ['Git', 'Xcode', 'VS Code', 'iOS dev', 'Cryptography', 'F1 data'],
  },
];

export const TELEMETRY_MODES = [
  {
    id: 'ios',
    label: 'iOS · SwiftUI',
    title: 'IronTrack Local-First Engine',
    metricLabel: 'Architecture',
    metricValue: 'MVVM + SwiftData',
    caption: 'Deterministic previous-set recall with zero network latency on the gym floor.',
    hue: '#8A5CFF',
  },
  {
    id: 'distributed',
    label: 'Systems · .NET 10',
    title: 'UTB.Minute Event Pipeline',
    metricLabel: 'Transport',
    metricValue: 'SSE Channels + EF Core',
    caption: 'Concurrency-safe canteen ordering orchestrated via .NET Aspire and PostgreSQL.',
    hue: '#4D38F5',
  },
  {
    id: 'telemetry',
    label: 'Data · F1 Python',
    title: 'F1DataCompare Trace Solver',
    metricLabel: 'Pipeline',
    metricValue: 'Multi-Driver Delta',
    caption: 'Normalized race telemetry comparing braking zones, speed traps, and stint pace.',
    hue: '#4EE0FF',
  },
];
