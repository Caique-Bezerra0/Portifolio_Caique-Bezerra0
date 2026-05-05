import { useEffect, useState } from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { ThemeToggle } from "@/components/theme-toggle";
import { saveRating } from "@/lib/ratings";

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

function StarRating({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-foreground">{label}</Text>
      <View className="flex-row gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => {
              triggerLightHaptic();
              onChange(star);
            }}
            className={star <= value ? "text-2xl" : "text-2xl opacity-30"}
            activeOpacity={0.7}
          >
            <Text className={star <= value ? "text-yellow-500 text-2xl" : "text-muted text-2xl"}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function RatingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const partnerName = (params.partnerName as string) || "Parceiro";
  const sessionId = (params.sessionId as string) || "";

  const [overallRating, setOverallRating] = useState(0);
  const [fluencyRating, setFluencyRating] = useState(0);
  const [engagementRating, setEngagementRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = overallRating > 0 && fluencyRating > 0 && engagementRating > 0;

  const handleSubmit = async () => {
    if (!canSubmit) {
      triggerLightHaptic();
      Alert.alert("Avaliação incompleta", "Por favor, avalie todos os critérios antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    triggerLightHaptic();

    try {
      await saveRating({
        sessionId,
        partnerName,
        rating: overallRating,
        fluency: fluencyRating,
        engagement: engagementRating,
        comment: comment.trim(),
      });

      triggerSuccessHaptic();
      Alert.alert("Obrigado!", "Sua avaliação foi registada com sucesso.", [
        {
          text: "Voltar",
          onPress: () => {
            router.replace("/(tabs)");
          },
        },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao guardar avaliação";
      Alert.alert("Erro", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    triggerLightHaptic();
    Alert.alert("Pular avaliação", "Tem a certeza que quer sair sem avaliar?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Sim, sair",
        onPress: () => {
          router.replace("/(tabs)");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenContainer className="px-5 pb-4" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View className="gap-6">
          <View className="flex-row items-center justify-between pt-2 pb-2">
            <View className="self-start rounded-full bg-primary/10 px-4 py-2">
              <Text className="text-xs font-bold uppercase tracking-[1.8px] text-primary">
                Avaliação
              </Text>
            </View>
            <ThemeToggle />
          </View>
          <View className="gap-3">
            <Text className="text-3xl font-bold leading-tight text-foreground">
              Como foi a conversa com {partnerName}?
            </Text>
            <Text className="text-base leading-6 text-muted">
              Seu feedback ajuda a melhorar futuros pareamentos e a criar uma comunidade melhor.
            </Text>
          </View>

          <View className="rounded-[28px] border border-border bg-surface p-5 shadow-sm">
            <View className="gap-6">
              <StarRating
                label="Avaliação geral da sessão"
                value={overallRating}
                onChange={setOverallRating}
              />

              <View className="border-t border-border pt-4">
                <StarRating
                  label="Fluência e clareza do parceiro"
                  value={fluencyRating}
                  onChange={setFluencyRating}
                />
              </View>

              <View className="border-t border-border pt-4">
                <StarRating
                  label="Envolvimento e interesse do parceiro"
                  value={engagementRating}
                  onChange={setEngagementRating}
                />
              </View>

              <View className="border-t border-border pt-4 gap-3">
                <Text className="text-sm font-bold text-foreground">Comentário (opcional)</Text>
                <TextInput
                  placeholder="Partilhe seus pensamentos, sugestões ou observações..."
                  placeholderTextColor="#A5B8BA"
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                  className="rounded-2xl border border-border bg-background p-4 text-foreground"
                  style={{ textAlignVertical: "top" }}
                />
                <Text className="text-xs text-muted text-right">
                  {comment.length}/500
                </Text>
              </View>
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              disabled={isSubmitting || !canSubmit}
              onPress={handleSubmit}
              className={`mt-6 min-h-[56px] items-center justify-center rounded-full px-6 ${
                canSubmit ? "bg-primary" : "bg-primary/50"
              }`}
              activeOpacity={0.82}
            >
              {isSubmitting ? (
                <View className="flex-row items-center gap-3">
                  <ActivityIndicator color="#F7FBFA" />
                  <Text className="text-base font-bold text-background">A guardar...</Text>
                </View>
              ) : (
                <Text className="text-base font-bold text-background">Enviar avaliação</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={handleSkip}
              className="mt-3 min-h-[48px] items-center justify-center rounded-full border border-border bg-surface px-6"
              activeOpacity={0.78}
            >
              <Text className="text-base font-bold text-foreground">Pular por agora</Text>
            </TouchableOpacity>
          </View>

          <View className="rounded-[24px] border border-border bg-surface p-5">
            <Text className="text-sm font-bold uppercase tracking-[1.4px] text-primary">
              Dica
            </Text>
            <Text className="mt-2 text-sm leading-6 text-muted">
              Avaliações honestas e construtivas ajudam a comunidade a crescer. Seja respeitoso e
              focado em melhorias futuras.
            </Text>
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
