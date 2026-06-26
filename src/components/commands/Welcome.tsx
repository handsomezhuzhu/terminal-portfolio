import {
  Cmd,
  HeroContainer,
  Link,
  PreImg,
  Seperator,
} from "../styles/Welcome.styled";
import { profile } from "../../config/profile";

const zhuzihanAscii = [
  "███████╗██╗  ██╗██╗   ██╗███████╗██╗██╗  ██╗ █████╗ ███╗   ██╗",
  "╚══███╔╝██║  ██║██║   ██║╚══███╔╝██║██║  ██║██╔══██╗████╗  ██║",
  "  ███╔╝ ███████║██║   ██║  ███╔╝ ██║███████║███████║██╔██╗ ██║",
  " ███╔╝  ██╔══██║██║   ██║ ███╔╝  ██║██╔══██║██╔══██║██║╚██╗██║",
  "███████╗██║  ██║╚██████╔╝███████╗██║██║  ██║██║  ██║██║ ╚████║",
  "╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝",
].join("\n");

const Welcome: React.FC = () => {
  return (
    <HeroContainer data-testid="welcome">
      <div className="info-section">
        <div>Welcome to {profile.siteName}. (Version 1.3.1)</div>
        <Seperator>----</Seperator>
        <div>
          This site's source code can be found in its{" "}
          <Link href={profile.repoUrl}>GitHub repo</Link>.
        </div>
        <div>
          Original template:{" "}
          <Link href={profile.originalRepoUrl}>
            Sat Naing's terminal portfolio
          </Link>
          .
        </div>
        <Seperator>----</Seperator>
        <div>
          For a list of available commands, type `<Cmd>help</Cmd>`.
        </div>
      </div>
      <div className="illu-section">
        <PreImg>{zhuzihanAscii}</PreImg>
      </div>
    </HeroContainer>
  );
};

export default Welcome;
