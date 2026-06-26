import { User, WebsiteName, Wrapper } from "./styles/TerminalInfo.styled";
import { profile } from "../config/profile";

const TermInfo = () => {
  return (
    <Wrapper>
      <User>{profile.promptUser}</User>@
      <WebsiteName>{profile.siteHost}</WebsiteName>:~$
    </Wrapper>
  );
};

export default TermInfo;
