import { describe, expect, it, vi } from "vitest";

import {
  buildJitsiRoom,
  createRandomSession,
  getCompatiblePartners,
  slugify,
} from "./language-meet";

describe("language meet session helpers", () => {
  it("normaliza nomes com acentos e espaços para slugs seguros de sala", () => {
    expect(slugify("Português para Conversação")).toBe("portugues-para-conversacao");
    expect(slugify("Alemão / Inglês")).toBe("alemao-ingles");
  });

  it("gera uma URL Jitsi Meet com sala segura e configurações de pré-entrada", () => {
    const room = buildJitsiRoom("Inglês", "Português", "Sofia", "seed123");

    expect(room.roomName).toBe("language-meet-ingles-portugues-sofia-seed123");
    expect(room.roomUrl).toContain("https://meet.jit.si/language-meet-ingles-portugues-sofia-seed123");
    expect(room.roomUrl).toContain("config.prejoinConfig.enabled=true");
    expect(room.roomUrl).toContain("config.defaultLanguage=ptBR");
  });

  it("prioriza parceiros compatíveis com o idioma-alvo ou idioma oferecido", () => {
    const matches = getCompatiblePartners("Espanhol", "Português");

    expect(matches.some((partner) => partner.offers === "Espanhol")).toBe(true);
    expect(matches.every((partner) => partner.offers === "Espanhol" || partner.learning === "Português")).toBe(true);
  });

  it("cria uma sessão com parceiro, nome de sala e URL quando recebe uma fonte aleatória", () => {
    vi.setSystemTime(new Date("2026-05-04T12:00:00Z"));

    const session = createRandomSession("Francês", "Português", () => 0.1);

    expect(session.partner.name).toBeTruthy();
    expect(session.roomName).toMatch(/^language-meet-frances-portugues-/);
    expect(session.roomUrl).toContain(session.roomName);

    vi.useRealTimers();
  });
});
