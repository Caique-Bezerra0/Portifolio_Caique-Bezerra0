export const languages = ["Inglês", "Espanhol", "Francês", "Alemão", "Italiano", "Português"] as const;
export const levels = ["Iniciante", "Intermédio", "Avançado"] as const;

export const partners = [
  {
    name: "Sofia",
    country: "Portugal",
    learning: "Inglês",
    offers: "Português",
    topic: "Apresentações pessoais e rotina de estudos",
  },
  {
    name: "Mateo",
    country: "Colômbia",
    learning: "Português",
    offers: "Espanhol",
    topic: "Viagens, cultura e expressões do dia a dia",
  },
  {
    name: "Claire",
    country: "França",
    learning: "Português",
    offers: "Francês",
    topic: "Comida, cidade e planos para a semana",
  },
  {
    name: "Luca",
    country: "Itália",
    learning: "Inglês",
    offers: "Italiano",
    topic: "Filmes, música e perguntas rápidas",
  },
  {
    name: "Hannah",
    country: "Alemanha",
    learning: "Espanhol",
    offers: "Alemão",
    topic: "Trabalho, universidade e hobbies",
  },
] as const;

export type Partner = (typeof partners)[number];

export type Session = {
  partner: Partner;
  roomName: string;
  roomUrl: string;
};

export function getCompatiblePartners(targetLanguage: string, offeredLanguage: string): Partner[] {
  const exactMatches = partners.filter(
    (partner) => partner.offers === targetLanguage || partner.learning === offeredLanguage,
  );

  return exactMatches.length > 0 ? [...exactMatches] : [...partners];
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildJitsiRoom(
  targetLanguage: string,
  offeredLanguage: string,
  partnerName: string,
  seed = Date.now().toString(36),
) {
  const roomName = [
    "language-meet",
    slugify(targetLanguage),
    slugify(offeredLanguage),
    slugify(partnerName),
    seed,
  ]
    .filter(Boolean)
    .join("-");

  const config = [
    "config.prejoinConfig.enabled=true",
    "config.defaultLanguage=ptBR",
    "config.startWithAudioMuted=false",
    "config.startWithVideoMuted=false",
    "config.disableInviteFunctions=true",
  ].join("&");

  return {
    roomName,
    roomUrl: `https://meet.jit.si/${roomName}#${config}`,
  };
}

export function createRandomSession(
  targetLanguage: string,
  offeredLanguage: string,
  random = Math.random,
): Session {
  const compatiblePartners = getCompatiblePartners(targetLanguage, offeredLanguage);
  const partner = compatiblePartners[Math.floor(random() * compatiblePartners.length)];
  const randomSuffix = random().toString(36).slice(2, 7);
  const seed = `${Date.now().toString(36)}-${randomSuffix}`;
  const room = buildJitsiRoom(targetLanguage, offeredLanguage, partner.name, seed);

  return { partner, ...room };
}
