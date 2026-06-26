export const profile = {
  displayName: "handsomezhuzhu",
  handle: "handsomezhuzhu",
  role: "undergraduate student at the School of Computer Science, Sun Yat-sen University",
  location: "China",
  siteName: "handsomezhuzhu Terminal",
  siteDescription:
    "A terminal-style portfolio and link hub for handsomezhuzhu, a computer science undergraduate at Sun Yat-sen University.",
  siteUrl: "https://about.zhuzihan.com/",
  siteHost: "zhuzihan.com",
  repoUrl: "https://github.com/handsomezhuzhu/terminal-portfolio",
  originalRepoUrl: "https://github.com/satnaing/terminal-portfolio",
  profileUrl: "https://github.com/handsomezhuzhu",
  guiUrl: "https://zhuzihan.com/",
  email: "zhuzihan@zhuzihan.com",
  homePath: "/home/handsomezhuzhu",
  promptUser: "visitor",
  currentUser: "visitor",
};

export const projects = [
  {
    id: 1,
    title: "Status Probe",
    desc: "A service status and uptime probe dashboard for zhuzihan.com services.",
    url: "https://status.zhuzihan.com/",
  },
  {
    id: 2,
    title: "API Health Check",
    desc: "A lightweight endpoint monitor for API availability testing.",
    url: "https://api-test.zhuzihan.com/",
  },
  {
    id: 3,
    title: "Temporary 2FA",
    desc: "A temporary two-factor authentication helper.",
    url: "https://2fa.zhuzihan.com/",
  },
  {
    id: 4,
    title: "File Courier Cabinet",
    desc: "A file transfer and temporary storage cabinet.",
    url: "https://file.zhuzihan.com/#/",
  },
];

export const socials = [
  {
    id: 1,
    title: "GitHub",
    url: profile.profileUrl,
    tab: 3,
  },
  {
    id: 2,
    title: "Email",
    url: `mailto:${profile.email}`,
    tab: 4,
  },
  {
    id: 3,
    title: "Website",
    url: profile.siteUrl,
    tab: 2,
  },
];

export const projectHints = projects.map(({ id, title }) => `${id}.${title}`);
export const socialHints = socials.map(({ id, title }) => `${id}.${title}`);
