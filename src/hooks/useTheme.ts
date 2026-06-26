import { useEffect, useState } from "react";
import themes from "../components/styles/themes";
import { setToLS, getFromLS } from "../utils/storage";
import { DefaultTheme } from "styled-components";

const THEME_STORAGE_KEY = "zhuzihan-theme";
const DEFAULT_THEME = themes.fedora;

export const useTheme = () => {
  const [theme, setTheme] = useState<DefaultTheme>(DEFAULT_THEME);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode: DefaultTheme) => {
    setToLS(THEME_STORAGE_KEY, mode.name);
    setTheme(mode);
  };

  useEffect(() => {
    const localThemeName = getFromLS(THEME_STORAGE_KEY);
    setTheme(
      localThemeName && themes[localThemeName]
        ? themes[localThemeName]
        : DEFAULT_THEME
    );
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode };
};
