import {
  AboutWrapper,
  HighlightAlt,
  HighlightSpan,
} from "../styles/About.styled";
import { profile } from "../../config/profile";

const About: React.FC = () => {
  return (
    <AboutWrapper data-testid="about">
      <p>
        Hi, this is <HighlightSpan>{profile.displayName}</HighlightSpan>.
      </p>
      <p>
        I'm an <HighlightAlt>{profile.role}</HighlightAlt> based in{" "}
        {profile.location}.
      </p>
      <p>
        This terminal is a small entry point to my services, experiments, and
        contact information.
      </p>
    </AboutWrapper>
  );
};

export default About;
