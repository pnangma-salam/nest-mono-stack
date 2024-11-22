import { darkTheme } from './dark';
import { lightTheme } from './light';

function generateThemes() {
  const themeList = [lightTheme, darkTheme];

  const themeOptions = themeList.map((theme) => ({
    label: theme.label,
    value: theme.value,
  }));

  const themes = themeList.reduce(
    (acc, theme) => {
      acc[theme.value] = theme.properties;
      return acc;
    },
    {} as Record<string, Record<string, string>>,
  );

  return { themeOptions, themes };
}

export const { themeOptions, themes } = generateThemes();
