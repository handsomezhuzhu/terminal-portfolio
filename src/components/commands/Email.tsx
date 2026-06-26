import { useContext, useEffect } from "react";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";
import { profile } from "../../config/profile";
import { getCurrentCmdArry } from "../../utils/funcs";

const Email: React.FC = () => {
  const { history, index, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = getCurrentCmdArry(history);

  useEffect(() => {
    if (
      rerender &&
      index === 0 &&
      currentCommand[0] === "email" &&
      currentCommand.length <= 1
    ) {
      window.open("mailto:" + profile.email, "_self");
    }
  }, [currentCommand, index, rerender]);

  return (
    <Wrapper>
      <span>{profile.email}</span>
    </Wrapper>
  );
};

export default Email;
