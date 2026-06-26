import { useContext } from "react";
import {
  getFileContent,
  getNode,
  isDirectory,
  resolvePath,
} from "../../config/filesystem";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";

const Cat: React.FC = () => {
  const { arg, cwd } = useContext(termContext);

  if (arg.length !== 1) {
    return <Wrapper data-testid="cat">Usage: cat &lt;file&gt;</Wrapper>;
  }

  const targetPath = resolvePath(cwd, arg[0]);
  const node = getNode(targetPath);

  if (!node) {
    return (
      <Wrapper data-testid="cat">
        cat: {arg[0]}: No such file or directory
      </Wrapper>
    );
  }

  if (isDirectory(targetPath)) {
    return <Wrapper data-testid="cat">cat: {arg[0]}: Is a directory</Wrapper>;
  }

  return (
    <Wrapper data-testid="cat">
      <pre>{getFileContent(targetPath)}</pre>
    </Wrapper>
  );
};

export default Cat;
