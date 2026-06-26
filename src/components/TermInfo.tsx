import { User, WebsiteName, Wrapper } from "./styles/TerminalInfo.styled";
import { profile } from "../config/profile";
import { displayPath } from "../config/filesystem";

type Props = {
  cwd?: string;
};

const TermInfo: React.FC<Props> = ({ cwd = profile.homePath }) => {
  return (
    <Wrapper>
      <User>{profile.promptUser}</User>@
      <WebsiteName>{profile.siteHost}</WebsiteName>:{displayPath(cwd)}$
    </Wrapper>
  );
};

export default TermInfo;
