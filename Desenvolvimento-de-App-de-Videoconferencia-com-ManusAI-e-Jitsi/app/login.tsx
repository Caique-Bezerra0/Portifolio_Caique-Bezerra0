import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUser } from "@/hooks/use-user";
import { useColors } from "@/hooks/use-colors";

function triggerLightHaptic() {
  if (Platform.OS !== "web") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
}

function triggerSuccessHaptic() {
  if (Platform.OS !== "web") {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }
}

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUser();
  const colors = useColors();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert("Erro", "Por favor, insira um nome de utilizador");
      return;
    }

    if (username.trim().length < 2) {
      Alert.alert("Erro", "O nome deve ter pelo menos 2 caracteres");
      return;
    }

    try {
      setIsLoading(true);
      triggerLightHaptic();

      // Fazer login
      await login(username);
      triggerSuccessHaptic();

      // Navegar para a tela principal
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Erro", "Falha ao criar conta. Tente novamente.");
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="px-5 pb-4" containerClassName="bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="gap-6">
          <View className="flex-row items-center justify-between pt-2 pb-2">
            <View className="self-start rounded-full bg-primary/10 px-4 py-2">
              <Text className="text-xs font-bold uppercase tracking-[1.8px] text-primary">
                TalkBridge
              </Text>
            </View>
            <ThemeToggle />
          </View>

          <View className="gap-3">
            <Text className="text-4xl font-bold leading-tight text-foreground">
              Bem-vindo ao TalkBridge
            </Text>
            <Text className="text-base leading-6 text-muted">
              Crie um nome de utilizador para começar a praticar idiomas com parceiros aleatórios.
            </Text>
          </View>

          <View className="rounded-[28px] border border-border bg-surface p-5 shadow-sm">
            <View className="gap-4">
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Nome de Utilizador</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: colors.border,
                      color: colors.foreground,
                      backgroundColor: colors.background,
                    },
                  ]}
                  placeholder="Ex: João Silva"
                  placeholderTextColor={colors.muted}
                  value={username}
                  onChangeText={setUsername}
                  editable={!isLoading}
                  maxLength={30}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <Text className="text-xs text-muted">
                  {username.length}/30 caracteres
                </Text>
              </View>

              <View className="gap-3">
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.8}
                  style={[
                    styles.button,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                >
                  {isLoading ? (
                    <ActivityIndicator color={colors.background} size="small" />
                  ) : (
                    <Text className="text-center font-semibold text-background">
                      Começar
                    </Text>
                  )}
                </TouchableOpacity>

                <Text className="text-xs text-center text-muted">
                  Este nome será usado nas suas sessões de conversação Jitsi Meet
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-3 rounded-[20px] border border-border bg-surface/50 p-4">
            <Text className="text-sm font-semibold text-foreground">Como funciona</Text>
            <View className="gap-2">
              <Text className="text-xs text-muted">
                • Escolha um idioma e nível de proficiência
              </Text>
              <Text className="text-xs text-muted">
                • Encontre um parceiro aleatório com interesses similares
              </Text>
              <Text className="text-xs text-muted">
                • Entre numa sala Jitsi Meet para conversa real
              </Text>
              <Text className="text-xs text-muted">
                • Avalie a sessão para melhorar futuros pareamentos
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "System",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
