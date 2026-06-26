import { useContext } from "react";
import {
  basename,
  getDirectoryEntries,
  getNode,
  isDirectory,
  resolvePath,
} from "../../config/filesystem";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";

const Ls: React.FC = () => {
  const { arg, cwd } = useContext(termContext);
  const parsedArgs = parseLsArgs(arg);

  if (parsedArgs.error) {
    return <Wrapper data-testid="ls">{parsedArgs.error}</Wrapper>;
  }

  if (parsedArgs.paths.length > 1) {
    return <Wrapper data-testid="ls">Usage: ls [options] [path]</Wrapper>;
  }

  const target = parsedArgs.paths[0] || ".";
  const targetPath = resolvePath(cwd, target);
  const node = getNode(targetPath);

  if (!node) {
    return (
      <Wrapper data-testid="ls">
        ls: cannot access '{target}': No such file or directory
      </Wrapper>
    );
  }

  if (!isDirectory(targetPath)) {
    return (
      <Wrapper data-testid="ls">
        {formatSingleFile(targetPath, parsedArgs.options.long)}
      </Wrapper>
    );
  }

  const entries = formatEntries(targetPath, parsedArgs.options);

  return <Wrapper data-testid="ls">{entries}</Wrapper>;
};

type LsOptions = {
  all: boolean;
  long: boolean;
  onePerLine: boolean;
};

const parseLsArgs = (args: string[]) => {
  const options: LsOptions = {
    all: false,
    long: false,
    onePerLine: false,
  };
  const paths: string[] = [];

  for (const arg of args) {
    if (arg === "--") continue;

    if (arg.startsWith("-") && arg.length > 1) {
      for (const flag of arg.slice(1)) {
        if (flag === "a") options.all = true;
        else if (flag === "l") options.long = true;
        else if (flag === "1") options.onePerLine = true;
        else {
          return {
            options,
            paths,
            error: `ls: invalid option -- '${flag}'`,
          };
        }
      }
    } else {
      paths.push(arg);
    }
  }

  return { options, paths };
};

const formatEntries = (targetPath: string, options: LsOptions) => {
  const entries = getDirectoryEntries(targetPath);
  const displayEntries = [
    ...(options.all
      ? [
          { displayName: ".", path: targetPath, type: "dir" },
          {
            displayName: "..",
            path: resolvePath(targetPath, ".."),
            type: "dir",
          },
        ]
      : []),
    ...entries.map(({ displayName, path, node }) => ({
      displayName,
      path,
      type: node?.type || "file",
    })),
  ];

  if (options.long) {
    return (
      <pre>
        {displayEntries
          .map(({ displayName, path, type }) =>
            formatLongEntry(displayName, path, type)
          )
          .join("\n")}
      </pre>
    );
  }

  const compactEntries = displayEntries.map(({ displayName }) => displayName);

  return options.onePerLine ? (
    <pre>{compactEntries.join("\n")}</pre>
  ) : (
    compactEntries.join("  ")
  );
};

const formatSingleFile = (path: string, long: boolean) => {
  const name = basename(path);
  return long ? <pre>{formatLongEntry(name, path, "file")}</pre> : name;
};

const formatLongEntry = (displayName: string, path: string, type: string) => {
  const mode = type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
  const size = type === "dir" ? "4096" : `${getFileSize(path)}`;
  return `${mode} 1 simon simon ${size.padStart(5, " ")} ${displayName}`;
};

const getFileSize = (path: string) => {
  const node = getNode(path);
  return node?.type === "file" ? node.content.length : 0;
};

export default Ls;
