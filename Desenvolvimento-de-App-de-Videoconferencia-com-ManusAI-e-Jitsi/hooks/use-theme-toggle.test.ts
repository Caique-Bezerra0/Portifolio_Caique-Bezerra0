import { describe, expect, it, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

vi.mock("@react-native-async-storage/async-storage");
vi.mock("./use-color-scheme", () => ({
  useColorScheme: () => "light",
}));

describe("useThemeToggle - persistência", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("salva a preferência de tema light", async () => {
    const mockSetItem = vi.fn().mockResolvedValue(undefined);
    (AsyncStorage.setItem as any) = mockSetItem;

    await AsyncStorage.setItem("language-meet-theme-preference", "light");

    expect(mockSetItem).toHaveBeenCalledWith("language-meet-theme-preference", "light");
  });

  it("salva a preferência de tema dark", async () => {
    const mockSetItem = vi.fn().mockResolvedValue(undefined);
    (AsyncStorage.setItem as any) = mockSetItem;

    await AsyncStorage.setItem("language-meet-theme-preference", "dark");

    expect(mockSetItem).toHaveBeenCalledWith("language-meet-theme-preference", "dark");
  });

  it("carrega a preferência de tema do armazenamento", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue("dark");

    const result = await AsyncStorage.getItem("language-meet-theme-preference");

    expect(result).toBe("dark");
  });

  it("retorna null se nenhuma preferência foi salva", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue(null);

    const result = await AsyncStorage.getItem("language-meet-theme-preference");

    expect(result).toBeNull();
  });
});
