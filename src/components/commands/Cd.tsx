import { useContext } from "react";
import { Wrapper } from "../styles/Output.styled";
import { termContext } from "../Terminal";

const Cd: React.FC = () => {
  const { cdError } = useContext(termContext);

  return <Wrapper data-testid="cd">{cdError}</Wrapper>;
};

export default Cd;
