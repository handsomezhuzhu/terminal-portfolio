import { useContext, useEffect } from "react";
import { termContext } from "../Terminal";
import { profile } from "../../config/profile";
import { getCurrentCmdArry } from "../../utils/funcs";

const Gui: React.FC = () => {
  const { history, index, rerender } = useContext(termContext);

  /* ===== get current command ===== */
  const currentCommand = getCurrentCmdArry(history);

  /* ===== check current command makes redirect ===== */
  useEffect(() => {
    if (rerender && index === 0 && currentCommand[0] === "gui") {
      window.open(profile.guiUrl, "_blank");
    }
  }, [currentCommand, index, rerender]);

  return <span></span>;
};

export default Gui;
