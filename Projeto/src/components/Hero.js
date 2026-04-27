import { translations } from '../translations.js';

export function Hero(lang = 'en') {
  const t = translations[lang];
  return `
    <section id="hero-banner" 
      class="text-center py-[60px] px-6 text-white transition-all duration-500 ease-in-out"
      style="background: linear-gradient(to right, #1a1a1a, var(--hero-center, #7b1e5a), var(--hero-right, #d4a0b5));"
    >
      <h1 class="text-5xl font-bold mb-2 flex items-center justify-center gap-3">
        <span>Pixel</span>
        <div class="w-6 h-6 bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)] animate-pulse"></div>
        <span>QR</span>
      </h1>
      <p class="text-lg opacity-90">${t.heroSubtitle}</p>
    </section>
  `;
}
