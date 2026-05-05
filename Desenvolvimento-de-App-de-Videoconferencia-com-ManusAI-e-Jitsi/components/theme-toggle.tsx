import { Platform, Pressable, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { useColors } from "@/hooks/use-colors";

function triggerLightHaptic() {
  if (Platform.OS !== "web") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

export function ThemeToggle() {
  const { themeMode, toggleTheme, setSystemTheme } = useThemeToggle();
  const colors = useColors();

  const handleToggle = () => {
    triggerLightHaptic();
    toggleTheme();
  };

  const handleSystemTheme = () => {
    triggerLightHaptic();
    setSystemTheme();
  };

  return (
    <View className="flex-row gap-2 items-center">
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: themeMode !== "system" ? colors.surface : "transparent",
          },
        ]}
      >
        <Text className="text-lg">
          {themeMode === "light" ? "☀️" : themeMode === "dark" ? "🌙" : "⚙️"}
        </Text>
      </Pressable>

      {themeMode !== "system" && (
        <Pressable
          onPress={handleSystemTheme}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              paddingHorizontal: 8,
              paddingVertical: 4,
            },
          ]}
        >
          <Text className="text-xs text-muted">Sistema</Text>
        </Pressable>
      )}
    </View>
  );
}
