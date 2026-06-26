import { useContext, useEffect } from "react";
import {
  getFileUrl,
  getNode,
  isDirectory,
  resolvePath,
} from "../../config/filesystem";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";

const Open: React.FC = () => {
  const { arg, cwd, index, rerender } = useContext(termContext);
  const target = arg[0] || "";
  const targetPath = resolvePath(cwd, target);
  const node = getNode(targetPath);
  const url = getFileUrl(targetPath);

  useEffect(() => {
    if (rerender && index === 0 && url) {
      window.open(url, "_blank");
    }
  }, [index, rerender, url]);

  if (arg.length !== 1) {
    return <Wrapper data-testid="open">Usage: open &lt;.url-file&gt;</Wrapper>;
  }

  if (!node) {
    return (
      <Wrapper data-testid="open">
        open: {target}: No such file or directory
      </Wrapper>
    );
  }

  if (isDirectory(targetPath)) {
    return <Wrapper data-testid="open">open: {target}: Is a directory</Wrapper>;
  }

  if (!url) {
    return <Wrapper data-testid="open">open: {target}: Not a URL file</Wrapper>;
  }

  return <Wrapper data-testid="open">Opening {url}</Wrapper>;
};

export default Open;
