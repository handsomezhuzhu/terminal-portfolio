import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Education: React.FC = () => {
  return (
    <Wrapper data-testid="education">
      <EduIntro>Here are a few background notes.</EduIntro>
      {eduBg.map(({ title, desc }) => (
        <EduList key={title}>
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </EduList>
      ))}
    </Wrapper>
  );
};

const eduBg = [
  {
    title: "Sun Yat-sen University",
    desc: "School of Computer Science | Undergraduate",
  },
  {
    title: "React + TypeScript",
    desc: "This terminal site is built with Vite, React, styled-components, and Vitest.",
  },
  {
    title: "Focus",
    desc: "Software engineering, web services, and practical developer tools.",
  },
];

export default Education;
