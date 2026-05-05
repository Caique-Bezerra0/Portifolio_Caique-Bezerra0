import { describe, expect, it, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAllRatings, getRatingStats, getPartnerAverageRating, saveRating } from "./ratings";

vi.mock("@react-native-async-storage/async-storage");

describe("ratings system", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("guarda uma avaliação com ID e timestamp únicos", async () => {
    const mockSetItem = vi.fn();
    (AsyncStorage.getItem as any).mockResolvedValue(null);
    (AsyncStorage.setItem as any) = mockSetItem;

    const rating = await saveRating({
      sessionId: "session-123",
      partnerName: "Sofia",
      rating: 5,
      fluency: 4,
      engagement: 5,
      comment: "Ótima conversa!",
    });

    expect(rating.id).toBeTruthy();
    expect(rating.timestamp).toBeGreaterThan(0);
    expect(rating.partnerName).toBe("Sofia");
    expect(mockSetItem).toHaveBeenCalled();
  });

  it("calcula estatísticas de avaliação por parceiro", async () => {
    const mockRatings = [
      {
        id: "1",
        sessionId: "s1",
        partnerName: "Sofia",
        rating: 5,
        fluency: 4,
        engagement: 5,
        comment: "Excelente",
        timestamp: 1000,
      },
      {
        id: "2",
        sessionId: "s2",
        partnerName: "Sofia",
        rating: 4,
        fluency: 4,
        engagement: 4,
        comment: "Bom",
        timestamp: 2000,
      },
      {
        id: "3",
        sessionId: "s3",
        partnerName: "Mateo",
        rating: 3,
        fluency: 3,
        engagement: 3,
        comment: "OK",
        timestamp: 3000,
      },
    ];

    (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify(mockRatings));

    const stats = await getRatingStats();

    expect(stats.totalRatings).toBe(3);
    expect(stats.averageRating).toBe(4);
    expect(stats.ratingsByPartner.Sofia.average).toBe(4.5);
    expect(stats.ratingsByPartner.Sofia.count).toBe(2);
    expect(stats.ratingsByPartner.Mateo.average).toBe(3);
  });

  it("retorna a avaliação média de um parceiro específico", async () => {
    const mockRatings = [
      {
        id: "1",
        sessionId: "s1",
        partnerName: "Claire",
        rating: 4,
        fluency: 4,
        engagement: 4,
        comment: "Bom",
        timestamp: 1000,
      },
      {
        id: "2",
        sessionId: "s2",
        partnerName: "Claire",
        rating: 5,
        fluency: 5,
        engagement: 5,
        comment: "Excelente",
        timestamp: 2000,
      },
    ];

    (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify(mockRatings));

    const average = await getPartnerAverageRating("Claire");

    expect(average).toBe(4.5);
  });

  it("retorna 0 para parceiros sem avaliações", async () => {
    (AsyncStorage.getItem as any).mockResolvedValue(JSON.stringify([]));

    const average = await getPartnerAverageRating("Desconhecido");

    expect(average).toBe(0);
  });
});
