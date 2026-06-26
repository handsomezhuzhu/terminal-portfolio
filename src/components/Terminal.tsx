import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import Output from "./Output";
import TermInfo from "./TermInfo";
import { profile } from "../config/profile";
import { isDirectory, resolvePath } from "../config/filesystem";
import {
  CmdNotFound,
  Empty,
  Form,
  Hints,
  Input,
  MobileBr,
  MobileSpan,
  Wrapper,
} from "./styles/Terminal.styled";
import { argTab } from "../utils/funcs";

type Command = {
  cmd: string;
  desc: string;
  tab: number;
}[];

export const commands: Command = [
  { cmd: "about", desc: `about ${profile.displayName}`, tab: 8 },
  { cmd: "cat", desc: "print file contents", tab: 10 },
  { cmd: "cd", desc: "change directory", tab: 11 },
  { cmd: "clear", desc: "clear the terminal", tab: 8 },
  { cmd: "echo", desc: "print out anything", tab: 9 },
  { cmd: "education", desc: "background and learning notes", tab: 4 },
  { cmd: "email", desc: "show contact email", tab: 8 },
  { cmd: "gui", desc: "open my main profile", tab: 10 },
  { cmd: "help", desc: "check available commands", tab: 9 },
  { cmd: "history", desc: "view command history", tab: 6 },
  { cmd: "ls", desc: "list directory contents", tab: 11 },
  { cmd: "open", desc: "open a .url file", tab: 9 },
  { cmd: "projects", desc: "view featured links and projects", tab: 5 },
  { cmd: "pwd", desc: "print current working directory", tab: 10 },
  { cmd: "socials", desc: "check out useful links", tab: 6 },
  { cmd: "themes", desc: "check available themes", tab: 7 },
  { cmd: "welcome", desc: "display hero section", tab: 6 },
  { cmd: "whoami", desc: "about current user", tab: 7 },
];

type Term = {
  arg: string[];
  history: HistoryEntry[];
  rerender: boolean;
  index: number;
  cwd: string;
  cdError?: string;
  clearHistory?: () => void;
};

export type HistoryEntry = {
  cmd: string;
  cwd: string;
  cdError?: string;
};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,
  cwd: profile.homePath,
});

const Terminal = () => {
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<HistoryEntry[]>([
    { cmd: "welcome", cwd: profile.homePath },
  ]);
  const [cwd, setCwd] = useState(profile.homePath);
  const [previousCwd, setPreviousCwd] = useState(profile.homePath);
  const [rerender, setRerender] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [pointer, setPointer] = useState(-1);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRerender(false);
    setInputVal(e.target.value);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commandArray = _.split(_.trim(inputVal), " ");
    const cdError = getCdError(commandArray, cwd, previousCwd);
    const nextCwd = getNextCwd(commandArray, cwd, previousCwd);

    setCmdHistory([{ cmd: inputVal, cwd, cdError }, ...cmdHistory]);
    if (!cdError && nextCwd && nextCwd !== cwd) {
      setPreviousCwd(cwd);
      setCwd(nextCwd);
    }
    setInputVal("");
    setRerender(true);
    setHints([]);
    setPointer(-1);
  };

  const clearHistory = () => {
    setCmdHistory([]);
    setHints([]);
  };

  // focus on input when terminal is clicked
  const handleDivClick = () => {
    inputRef.current && inputRef.current.focus();
  };
  useEffect(() => {
    document.addEventListener("click", handleDivClick);
    return () => {
      document.removeEventListener("click", handleDivClick);
    };
  }, [containerRef]);

  // Keyboard Press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setRerender(false);
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    // if Tab or Ctrl + I
    if (e.key === "Tab" || ctrlI) {
      e.preventDefault();
      if (!inputVal) return;

      let hintsCmds: string[] = [];
      commands.forEach(({ cmd }) => {
        if (_.startsWith(cmd, inputVal)) {
          hintsCmds = [...hintsCmds, cmd];
        }
      });

      const returnedHints = argTab(inputVal, setInputVal, setHints, hintsCmds);
      hintsCmds = returnedHints ? [...hintsCmds, ...returnedHints] : hintsCmds;

      // if there are many command to autocomplete
      if (hintsCmds.length > 1) {
        setHints(hintsCmds);
      }
      // if only one command to autocomplete
      else if (hintsCmds.length === 1) {
        const currentCmd = _.split(inputVal, " ");
        setInputVal(
          currentCmd.length !== 1
            ? `${currentCmd[0]} ${currentCmd[1]} ${hintsCmds[0]}`
            : hintsCmds[0]
        );

        setHints([]);
      }
    }

    // if Ctrl + L
    if (ctrlL) {
      clearHistory();
    }

    // Go previous cmd
    if (e.key === "ArrowUp") {
      if (pointer >= cmdHistory.length) return;

      if (pointer + 1 === cmdHistory.length) return;

      setInputVal(cmdHistory[pointer + 1].cmd);
      setPointer(prevState => prevState + 1);
      inputRef?.current?.blur();
    }

    // Go next cmd
    if (e.key === "ArrowDown") {
      if (pointer < 0) return;

      if (pointer === 0) {
        setInputVal("");
        setPointer(-1);
        return;
      }

      setInputVal(cmdHistory[pointer - 1].cmd);
      setPointer(prevState => prevState - 1);
      inputRef?.current?.blur();
    }
  };

  // For caret position at the end
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [inputRef, inputVal, pointer]);

  return (
    <Wrapper data-testid="terminal-wrapper" ref={containerRef}>
      {hints.length > 1 && (
        <div>
          {hints.map(hCmd => (
            <Hints key={hCmd}>{hCmd}</Hints>
          ))}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="terminal-input">
          <TermInfo cwd={cwd} /> <MobileBr />
          <MobileSpan>&#62;</MobileSpan>
        </label>
        <Input
          title="terminal-input"
          type="text"
          id="terminal-input"
          autoComplete="off"
          spellCheck="false"
          autoFocus
          autoCapitalize="off"
          ref={inputRef}
          value={inputVal}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </Form>

      {cmdHistory.map((historyEntry, index) => {
        const commandArray = _.split(_.trim(historyEntry.cmd), " ");
        const validCommand = _.find(commands, { cmd: commandArray[0] });
        const contextValue = {
          arg: _.drop(commandArray),
          history: cmdHistory,
          rerender,
          index,
          cwd: historyEntry.cwd,
          cdError: historyEntry.cdError,
          clearHistory,
        };
        return (
          <div key={_.uniqueId(`${historyEntry.cmd}_`)}>
            <div>
              <TermInfo cwd={historyEntry.cwd} />
              <MobileBr />
              <MobileSpan>&#62;</MobileSpan>
              <span data-testid="input-command">{historyEntry.cmd}</span>
            </div>
            {validCommand ? (
              <termContext.Provider value={contextValue}>
                <Output index={index} cmd={commandArray[0]} />
              </termContext.Provider>
            ) : historyEntry.cmd === "" ? (
              <Empty />
            ) : (
              <CmdNotFound data-testid={`not-found-${index}`}>
                command not found: {historyEntry.cmd}
              </CmdNotFound>
            )}
          </div>
        );
      })}
    </Wrapper>
  );
};

const getNextCwd = (
  commandArray: string[],
  cwd: string,
  previousCwd: string
) => {
  if (commandArray[0] !== "cd" || commandArray.length > 2) return null;
  const target = commandArray[1] === "-" ? previousCwd : commandArray[1];
  const nextCwd = resolvePath(cwd, target || "~");
  return isDirectory(nextCwd) ? nextCwd : null;
};

const getCdError = (
  commandArray: string[],
  cwd: string,
  previousCwd: string
) => {
  if (commandArray[0] !== "cd") return undefined;
  if (commandArray.length > 2) return "cd: too many arguments";

  const target = commandArray[1] === "-" ? previousCwd : commandArray[1];
  const nextCwd = resolvePath(cwd, target || "~");
  return isDirectory(nextCwd)
    ? undefined
    : `cd: no such file or directory: ${commandArray[1]}`;
};

export default Terminal;
