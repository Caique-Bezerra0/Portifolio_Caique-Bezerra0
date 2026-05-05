import AsyncStorage from "@react-native-async-storage/async-storage";

export type Rating = {
  id: string;
  sessionId: string;
  partnerName: string;
  rating: number;
  fluency: number;
  engagement: number;
  comment: string;
  timestamp: number;
};

export type RatingStats = {
  averageRating: number;
  totalRatings: number;
  ratingsByPartner: Record<string, { average: number; count: number }>;
};

const RATINGS_STORAGE_KEY = "language-meet-ratings";

export async function saveRating(rating: Omit<Rating, "id" | "timestamp">): Promise<Rating> {
  const newRating: Rating = {
    ...rating,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: Date.now(),
  };

  const existing = await getAllRatings();
  const updated = [...existing, newRating];

  await AsyncStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(updated));
  return newRating;
}

export async function getAllRatings(): Promise<Rating[]> {
  const data = await AsyncStorage.getItem(RATINGS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getRatingStats(): Promise<RatingStats> {
  const ratings = await getAllRatings();

  if (ratings.length === 0) {
    return {
      averageRating: 0,
      totalRatings: 0,
      ratingsByPartner: {},
    };
  }

  const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

  const ratingsByPartner: Record<string, { average: number; count: number }> = {};
  ratings.forEach((rating) => {
    if (!ratingsByPartner[rating.partnerName]) {
      ratingsByPartner[rating.partnerName] = { average: 0, count: 0 };
    }
    ratingsByPartner[rating.partnerName].count += 1;
    ratingsByPartner[rating.partnerName].average += rating.rating;
  });

  Object.keys(ratingsByPartner).forEach((partner) => {
    ratingsByPartner[partner].average /= ratingsByPartner[partner].count;
  });

  return {
    averageRating,
    totalRatings: ratings.length,
    ratingsByPartner,
  };
}

export async function getPartnerAverageRating(partnerName: string): Promise<number> {
  const stats = await getRatingStats();
  return stats.ratingsByPartner[partnerName]?.average ?? 0;
}

export function getRecommendedPartners(
  allPartners: Array<{ name: string }>,
  maxPartners = 3,
): Promise<string[]> {
  return getRatingStats().then((stats) => {
    const scored = allPartners.map((partner) => ({
      name: partner.name,
      score: stats.ratingsByPartner[partner.name]?.average ?? 2.5,
    }));

    return scored.sort((a, b) => b.score - a.score).slice(0, maxPartners).map((p) => p.name);
  });
}
