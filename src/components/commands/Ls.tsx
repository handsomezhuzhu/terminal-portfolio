import { useContext } from "react";
import {
  basename,
  getNode,
  isDirectory,
  listDirectory,
  resolvePath,
} from "../../config/filesystem";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";

const Ls: React.FC = () => {
  const { arg, cwd } = useContext(termContext);

  if (arg.length > 1) {
    return <Wrapper data-testid="ls">Usage: ls [path]</Wrapper>;
  }

  const target = arg[0] || ".";
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
    return <Wrapper data-testid="ls">{basename(targetPath)}</Wrapper>;
  }

  return (
    <Wrapper data-testid="ls">{listDirectory(targetPath).join("  ")}</Wrapper>
  );
};

export default Ls;
