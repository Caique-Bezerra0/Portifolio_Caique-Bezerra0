import { translations } from '../translations.js';

export function Preview(extension, lang = 'en') {
  const t = translations[lang];
  return `
    <div class="flex flex-col items-center justify-center gap-8 bg-[var(--color-bg-secondary)] p-8 rounded-2xl shadow-xl border border-[var(--color-border)] h-full transition-colors duration-300">
      <div id="qr-code-container" class="bg-white p-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center min-w-[364px] min-h-[364px]"></div>
      
      <div class="flex flex-col items-center gap-4 w-full">
        <button id="btn-download" class="w-full bg-[#3b82f6] text-white border-none px-8 py-3 rounded-xl font-semibold text-[15px] cursor-pointer hover:bg-[#2563eb] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg">
          ${t.download}
        </button>
        
        <div class="flex gap-2 p-1 bg-[var(--color-bg-accent)] rounded-lg transition-colors duration-300">
          <button class="ext-btn px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${extension === 'png' ? 'bg-[var(--color-bg-secondary)] text-[#3b82f6] shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}" data-ext="png">PNG</button>
          <button class="ext-btn px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${extension === 'jpeg' ? 'bg-[var(--color-bg-secondary)] text-[#3b82f6] shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}" data-ext="jpeg">JPEG</button>
          <button class="ext-btn px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${extension === 'svg' ? 'bg-[var(--color-bg-secondary)] text-[#3b82f6] shadow-sm' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}" data-ext="svg">SVG</button>
        </div>
      </div>
    </div>
  `;
}
