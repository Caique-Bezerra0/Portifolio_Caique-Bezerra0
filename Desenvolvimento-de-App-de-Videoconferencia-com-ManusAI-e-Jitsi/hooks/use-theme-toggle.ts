import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "./use-color-scheme";

const THEME_STORAGE_KEY = "language-meet-theme-preference";

export type ThemeMode = "light" | "dark" | "system";

export function useThemeToggle() {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved && (saved === "light" || saved === "dark" || saved === "system")) {
        setThemeMode(saved);
      }
    } catch (error) {
      console.error("Erro ao carregar preferência de tema:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveThemePreference = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeMode(mode);
    } catch (error) {
      console.error("Erro ao guardar preferência de tema:", error);
    }
  };

  const toggleTheme = () => {
    const nextMode: ThemeMode = themeMode === "light" ? "dark" : "light";
    saveThemePreference(nextMode);
  };

  const setSystemTheme = () => {
    saveThemePreference("system");
  };

  const getCurrentTheme = (): "light" | "dark" => {
    if (themeMode === "system") {
      return systemColorScheme ?? "light";
    }
    return themeMode;
  };

  return {
    themeMode,
    setThemeMode: saveThemePreference,
    toggleTheme,
    setSystemTheme,
    getCurrentTheme,
    isLoaded,
  };
}
