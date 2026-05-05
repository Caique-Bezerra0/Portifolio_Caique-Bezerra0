import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  createRandomSession,
  getCompatiblePartners,
  languages,
  levels,
  type Session,
} from "@/lib/language-meet";

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

function triggerErrorHaptic() {
  if (Platform.OS !== "web") {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }
}

function SelectableChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={() => {
        triggerLightHaptic();
        onPress();
      }}
      className={selected ? "rounded-full bg-primary px-4 py-3" : "rounded-full border border-border bg-surface px-4 py-3"}
      activeOpacity={0.78}
    >
      <Text className={selected ? "text-sm font-semibold text-background" : "text-sm font-semibold text-foreground"}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [targetLanguage, setTargetLanguage] = useState("Inglês");
  const [offeredLanguage, setOfferedLanguage] = useState("Português");
  const [level, setLevel] = useState("Intermédio");
  const [isSearching, setIsSearching] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [statusMessage, setStatusMessage] = useState("Escolha as suas preferências e encontre um parceiro de estudo.");

  const compatiblePartners = useMemo(
    () => getCompatiblePartners(targetLanguage, offeredLanguage),
    [targetLanguage, offeredLanguage],
  );

  const findPartner = () => {
    triggerLightHaptic();
    setIsSearching(true);
    setSession(null);
    setStatusMessage("A procurar alguém disponível para praticar agora...");

    setTimeout(() => {
      const nextSession = createRandomSession(targetLanguage, offeredLanguage);

      setSession(nextSession);
      setIsSearching(false);
      setStatusMessage("Parceiro encontrado. Reveja o tema sugerido e entre na sala quando estiver pronto.");
      triggerSuccessHaptic();
    }, 900);
  };

  const openJitsiRoom = async () => {
    if (!session) {
      return;
    }

    triggerLightHaptic();

    try {
      const result = await WebBrowser.openBrowserAsync(session.roomUrl, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
      });

      if (result.type === "dismiss" || result.type === "cancel") {
        setTimeout(() => {
          router.push({
            pathname: "/rating",
            params: {
              partnerName: session.partner.name,
              sessionId: session.roomName,
            },
          });
        }, 500);
      }
    } catch (error) {
      triggerErrorHaptic();
      const message = error instanceof Error ? error.message : "Não foi possível abrir a sala Jitsi.";
      Alert.alert("Erro ao abrir Jitsi Meet", message);
    }
  };

  const resetSession = () => {
    triggerLightHaptic();
    setSession(null);
    setStatusMessage("Sessão reiniciada. Pode procurar outro parceiro quando quiser.");
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
              <Text className="text-xs font-bold uppercase tracking-[1.8px] text-primary">TalkBridge</Text>
            </View>
            <ThemeToggle />
          </View>
          <View className="gap-3">
            <Text className="text-4xl font-bold leading-tight text-foreground">Conecte-se com outros para praticar idiomas.</Text>
            <Text className="text-base leading-6 text-muted">
              Escolha um idioma, encontre um parceiro aleatório e entre numa sala Jitsi Meet para conversação real.
            </Text>
          </View>

          <View className="rounded-[28px] border border-border bg-surface p-5 shadow-sm">
            <View className="mb-5 gap-2">
              <Text className="text-xl font-bold text-foreground">Preferências da sessão</Text>
              <Text className="text-sm leading-5 text-muted">A primeira versão usa pareamento local simulado para demonstrar o fluxo de conversação. {compatiblePartners.length} possíveis parceiros correspondem às suas escolhas.</Text>
            </View>

            <View className="gap-5">
              <View className="gap-3">
                <Text className="text-sm font-bold text-foreground">Quero praticar</Text>
                <View className="flex-row flex-wrap gap-2">
                  {languages.map((language) => (
                    <SelectableChip
                      key={`target-${language}`}
                      label={language}
                      selected={targetLanguage === language}
                      onPress={() => setTargetLanguage(language)}
                    />
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-sm font-bold text-foreground">Posso ajudar com</Text>
                <View className="flex-row flex-wrap gap-2">
                  {languages.map((language) => (
                    <SelectableChip
                      key={`offer-${language}`}
                      label={language}
                      selected={offeredLanguage === language}
                      onPress={() => setOfferedLanguage(language)}
                    />
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <Text className="text-sm font-bold text-foreground">Nível atual</Text>
                <View className="flex-row flex-wrap gap-2">
                  {levels.map((item) => (
                    <SelectableChip
                      key={item}
                      label={item}
                      selected={level === item}
                      onPress={() => setLevel(item)}
                    />
                  ))}
                </View>
              </View>
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              disabled={isSearching}
              onPress={findPartner}
              className="mt-6 min-h-[56px] items-center justify-center rounded-full bg-primary px-6"
              activeOpacity={0.82}
            >
              {isSearching ? (
                <View className="flex-row items-center gap-3">
                  <ActivityIndicator color="#F7FBFA" />
                  <Text className="text-base font-bold text-background">A procurar parceiro...</Text>
                </View>
              ) : (
                <Text className="text-base font-bold text-background">Encontrar parceiro</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="rounded-[24px] border border-border bg-surface p-5">
            <Text className="text-sm font-bold uppercase tracking-[1.4px] text-primary">Estado</Text>
            <Text className="mt-2 text-base leading-6 text-foreground">{statusMessage}</Text>
          </View>

          {session ? (
            <View className="rounded-[28px] border border-primary/30 bg-primary/10 p-5">
              <View className="mb-4 flex-row items-start justify-between gap-4">
                <View className="flex-1">
                  <Text className="text-sm font-bold uppercase tracking-[1.4px] text-primary">Parceiro encontrado</Text>
                  <Text className="mt-2 text-3xl font-bold text-foreground">{session.partner.name}</Text>
                  <Text className="mt-1 text-sm text-muted">{session.partner.country} · nível {level}</Text>
                </View>
                <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                  <Text className="text-xl font-black text-background">{session.partner.name.slice(0, 1)}</Text>
                </View>
              </View>

              <View className="gap-3 rounded-2xl bg-surface p-4">
                <View className="flex-row justify-between gap-4">
                  <Text className="text-sm text-muted">Quer praticar</Text>
                  <Text className="text-sm font-bold text-foreground">{session.partner.learning}</Text>
                </View>
                <View className="flex-row justify-between gap-4">
                  <Text className="text-sm text-muted">Pode ajudar com</Text>
                  <Text className="text-sm font-bold text-foreground">{session.partner.offers}</Text>
                </View>
                <View className="border-t border-border pt-3">
                  <Text className="text-sm text-muted">Tema sugerido</Text>
                  <Text className="mt-1 text-base font-semibold leading-6 text-foreground">{session.partner.topic}</Text>
                </View>
              </View>

              <Text className="mt-4 text-xs leading-5 text-muted">Sala segura gerada: {session.roomName}</Text>

              <TouchableOpacity
                accessibilityRole="link"
                onPress={openJitsiRoom}
                className="mt-5 min-h-[56px] items-center justify-center rounded-full bg-primary px-6"
                activeOpacity={0.82}
              >
                <Text className="text-base font-bold text-background">Entrar na chamada Jitsi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                accessibilityRole="button"
                onPress={resetSession}
                className="mt-3 min-h-[48px] items-center justify-center rounded-full border border-border bg-surface px-6"
                activeOpacity={0.78}
              >
                <Text className="text-base font-bold text-foreground">Procurar outro parceiro</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View className="rounded-[24px] border border-border bg-surface p-5">
            <Text className="text-xl font-bold text-foreground">Guia rápido para a conversa</Text>
            <View className="mt-4 gap-3">
              <Text className="text-sm leading-6 text-muted">1. Combine dois blocos de 10 minutos: metade no idioma que está a aprender e metade no idioma do parceiro.</Text>
              <Text className="text-sm leading-6 text-muted">2. Comece pelo tema sugerido, faça perguntas abertas e peça correções gentis.</Text>
              <Text className="text-sm leading-6 text-muted">3. Evite partilhar dados pessoais em conversas aleatórias e saia se a sessão não for confortável.</Text>
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
    paddingBottom: 24,
  },
});
