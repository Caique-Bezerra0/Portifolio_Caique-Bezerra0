import { translations } from '../translations.js';

export function Header(lang = 'en') {
  const t = translations[lang];
  return `
    <header class="sticky top-0 z-50 py-4 bg-[#1a1a1a] flex items-center justify-between px-6">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="text-white font-bold text-3xl leading-none">Pixel</div>
          <div class="w-4 h-4 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse"></div>
        </div>
        <div class="w-px h-8 bg-white opacity-50"></div>
        <div class="text-white text-2xl font-bold leading-none tracking-tight">
          QR
        </div>
      </div>
      <div class="flex items-center gap-6">
        <button id="theme-toggle" class="text-white p-2 rounded-full hover:bg-white/10 transition-colors">
          <svg id="theme-icon-sun" class="hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg id="theme-icon-moon" class="hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button id="lang-toggle" class="text-white text-xs font-bold uppercase border border-white/20 px-2 py-1 rounded hover:bg-white/10 transition-colors">
          ${lang === 'en' ? 'PT' : 'EN'}
        </button>
        <a href="https://www.npmjs.com/package/qr-code-styling" target="_blank" class="text-white text-sm no-underline hover:opacity-80 transition-opacity">npm v1.8.3</a>
        <a href="https://github.com/kozakdenys/qr-code-styling" target="_blank" class="text-white text-sm no-underline hover:opacity-80 transition-opacity">GitHub</a>
      </div>
    </header>
  `;
}
