import { profile, projects, socials } from "./profile";

type DirectoryNode = {
  type: "dir";
  entries: string[];
};

type FileNode = {
  type: "file";
  content: string;
  url?: string;
};

export type FsNode = DirectoryNode | FileNode;

const home = profile.homePath;
const projectsPath = `${home}/projects`;
const linksPath = `${home}/links`;

const projectFiles = [
  {
    name: "status-probe.url",
    project: projects[0],
  },
  {
    name: "api-health.url",
    project: projects[1],
  },
  {
    name: "temporary-2fa.url",
    project: projects[2],
  },
  {
    name: "file-cabinet.url",
    project: projects[3],
  },
];

const socialFiles = [
  {
    name: "github.url",
    social: socials[0],
  },
  {
    name: "email.url",
    social: socials[1],
  },
  {
    name: "website.url",
    social: socials[2],
  },
];

export const fileSystem: Record<string, FsNode> = {
  "/": {
    type: "dir",
    entries: ["home"],
  },
  "/home": {
    type: "dir",
    entries: [profile.handle],
  },
  [home]: {
    type: "dir",
    entries: ["README.md", "about.txt", "education.txt", "projects", "links"],
  },
  [`${home}/README.md`]: {
    type: "file",
    content: `Welcome to ${profile.siteName}. Try ls, cd projects, cat about.txt, or open links/github.url.`,
  },
  [`${home}/about.txt`]: {
    type: "file",
    content: `${profile.displayName} is an ${profile.role} based in ${profile.location}.`,
  },
  [`${home}/education.txt`]: {
    type: "file",
    content:
      "Sun Yat-sen University, School of Computer Science, Undergraduate.",
  },
  [projectsPath]: {
    type: "dir",
    entries: projectFiles.map(({ name }) => name),
  },
  [linksPath]: {
    type: "dir",
    entries: socialFiles.map(({ name }) => name),
  },
};

projectFiles.forEach(({ name, project }) => {
  fileSystem[`${projectsPath}/${name}`] = {
    type: "file",
    content: `${project.title}\n${project.desc}\n${project.url}`,
    url: project.url,
  };
});

socialFiles.forEach(({ name, social }) => {
  fileSystem[`${linksPath}/${name}`] = {
    type: "file",
    content: `${social.title}\n${social.url}`,
    url: social.url,
  };
});

export const normalizePath = (path: string) => {
  const parts: string[] = [];

  path.split("/").forEach(part => {
    if (!part || part === ".") return;
    if (part === "..") {
      parts.pop();
      return;
    }
    parts.push(part);
  });

  return `/${parts.join("/")}`;
};

export const resolvePath = (cwd: string, target = ".") => {
  if (!target || target === "~") return home;
  if (target.startsWith("~/"))
    return normalizePath(`${home}/${target.slice(2)}`);
  if (target.startsWith("/")) return normalizePath(target);
  return normalizePath(`${cwd}/${target}`);
};

export const displayPath = (path: string) => {
  if (path === home) return "~";
  if (path.startsWith(`${home}/`)) return `~/${path.slice(home.length + 1)}`;
  return path;
};

export const getNode = (path: string) => fileSystem[path];
export const isDirectory = (path: string) => getNode(path)?.type === "dir";
export const isFile = (path: string) => getNode(path)?.type === "file";

export const listDirectory = (path: string) => {
  const node = getNode(path);
  if (!node || node.type !== "dir") return [];

  return node.entries.map(entry => formatDirectoryEntry(path, entry));
};

export const formatDirectoryEntry = (directoryPath: string, entry: string) => {
  const childPath = resolvePath(directoryPath, entry);
  return isDirectory(childPath) ? `${entry}/` : entry;
};

export const getDirectoryEntries = (path: string) => {
  const node = getNode(path);
  if (!node || node.type !== "dir") return [];

  return node.entries.map(entry => {
    const childPath = resolvePath(path, entry);
    return {
      name: entry,
      displayName: formatDirectoryEntry(path, entry),
      path: childPath,
      node: getNode(childPath),
    };
  });
};

export const basename = (path: string) =>
  path.split("/").filter(Boolean).pop() || "/";

export const getFileContent = (path: string) => {
  const node = getNode(path);
  return node?.type === "file" ? node.content : null;
};

export const getFileUrl = (path: string) => {
  const node = getNode(path);
  return node?.type === "file" ? node.url : undefined;
};
