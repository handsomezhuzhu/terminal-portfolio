import About from "./commands/About";
import Cat from "./commands/Cat";
import Cd from "./commands/Cd";
import Clear from "./commands/Clear";
import Echo from "./commands/Echo";
import Education from "./commands/Education";
import Email from "./commands/Email";
import GeneralOutput from "./commands/GeneralOutput";
import Gui from "./commands/Gui";
import Help from "./commands/Help";
import Welcome from "./commands/Welcome";
import History from "./commands/History";
import Ls from "./commands/Ls";
import Open from "./commands/Open";
import Projects from "./commands/Projects";
import Socials from "./commands/Socials";
import Themes from "./commands/Themes";
import { OutputContainer, UsageDiv } from "./styles/Output.styled";
import { termContext } from "./Terminal";
import { useContext } from "react";
import { profile } from "../config/profile";

type Props = {
  index: number;
  cmd: string;
};

const Output: React.FC<Props> = ({ index, cmd }) => {
  const { arg, cwd } = useContext(termContext);

  const specialCmds = [
    "cat",
    "cd",
    "echo",
    "ls",
    "open",
    "projects",
    "socials",
    "themes",
  ];

  // return 'Usage: <cmd>' if command arg is not valid
  // eg: about tt
  if (!specialCmds.includes(cmd) && arg.length > 0)
    return <UsageDiv data-testid="usage-output">Usage: {cmd}</UsageDiv>;

  return (
    <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
      {
        {
          about: <About />,
          cat: <Cat />,
          cd: <Cd />,
          clear: <Clear />,
          echo: <Echo />,
          education: <Education />,
          email: <Email />,
          gui: <Gui />,
          help: <Help />,
          history: <History />,
          ls: <Ls />,
          open: <Open />,
          projects: <Projects />,
          pwd: <GeneralOutput>{cwd}</GeneralOutput>,
          socials: <Socials />,
          themes: <Themes />,
          welcome: <Welcome />,
          whoami: <GeneralOutput>{profile.currentUser}</GeneralOutput>,
        }[cmd]
      }
    </OutputContainer>
  );
};

export default Output;
