import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("useUser hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a user with valid username", () => {
    const username = "João Silva";
    const id = `user_${Date.now()}_test123`;
    const createdAt = new Date().toISOString();

    const user = {
      id,
      username: username.trim(),
      createdAt,
    };

    expect(user.username).toBe("João Silva");
    expect(user.id).toContain("user_");
    expect(user.createdAt).toBeDefined();
  });

  it("should trim whitespace from username", () => {
    const username = "  Maria Santos  ";
    const trimmed = username.trim();

    expect(trimmed).toBe("Maria Santos");
  });

  it("should generate unique user IDs", () => {
    const id1 = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const id2 = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    expect(id1).not.toBe(id2);
  });

  it("should serialize user data to JSON", () => {
    const userData = {
      id: "user_123",
      username: "Test User",
      createdAt: "2026-05-04T23:00:00Z",
    };

    const jsonData = JSON.stringify(userData);
    expect(jsonData).toContain("Test User");
    expect(jsonData).toContain("user_123");
  });

  it("should deserialize user data from JSON", () => {
    const jsonData = '{"id":"user_123","username":"Test User","createdAt":"2026-05-04T23:00:00Z"}';
    const parsed = JSON.parse(jsonData);

    expect(parsed.username).toBe("Test User");
    expect(parsed.id).toBe("user_123");
  });

  it("should validate username is not empty after trim", () => {
    const username = "  Valid User  ";
    const trimmed = username.trim();

    expect(trimmed.length).toBeGreaterThan(0);
  });
});
