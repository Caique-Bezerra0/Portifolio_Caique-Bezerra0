import { Accordion } from './Accordion.js';
import { StyleButtons } from './StyleButtons.js';
import { translations } from '../translations.js';

export function Controls(options, lang = 'en') {
  const t = translations[lang];

  const mainOptions = `
    <div class="mb-5">
      <label class="block font-medium mb-2 text-gray-500">${t.data}</label>
      <input type="text" id="input-data" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" value="${options.data}">
    </div>
    <div class="mb-5">
      <label class="block font-medium mb-2 text-gray-500">${t.imageFile}</label>
      <input type="file" id="input-image" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*">
    </div>
    <div class="grid grid-cols-3 gap-3">
      <div>
        <label class="block font-medium mb-2 text-gray-500">${t.width}</label>
        <input type="number" id="input-width" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" value="${options.width}">
      </div>
      <div>
        <label class="block font-medium mb-2 text-gray-500">${t.height}</label>
        <input type="number" id="input-height" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" value="${options.height}">
      </div>
      <div>
        <label class="block font-medium mb-2 text-gray-500">${t.margin}</label>
        <input type="number" id="input-margin" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" value="${options.margin}">
      </div>
    </div>
  `;

  const dotsOptions = `
    <div class="mb-5">
      <label class="block font-medium mb-2 text-gray-500">${t.dotsStyle}</label>
      ${StyleButtons('dots', options.dotsOptions.type)}
    </div>
    <div class="mb-5">
      <label class="block font-medium mb-2 text-gray-500">${t.colorType}</label>
      <div class="flex gap-4 mb-3">
        <label class="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="dots-color-type" value="single" checked> ${t.singleColor}</label>
        <label class="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="dots-color-type" value="gradient"> ${t.colorGradient}</label>
      </div>
      <div class="flex items-center gap-3">
        <input type="color" id="dots-color" class="w-10 h-10 border border-gray-200 rounded cursor-pointer p-0.5" value="${options.dotsOptions.color}">
        <span class="text-sm text-gray-600">${t.dotsColor}</span>
      </div>
    </div>
  `;

  const cornersSquareOptions = `
    <div class="mb-5">
      <label class="block font-medium mb-2 text-gray-500">${t.cornersSquareStyle}</label>
      ${StyleButtons('cornersSquare', options.cornersSquareOptions.type)}
    </div>
    <div class="flex items-center gap-3">
      <input type="color" id="corners-square-color" class="w-10 h-10 border border-gray-200 rounded cursor-pointer p-0.5" value="${options.cornersSquareOptions.color}">
      <span class="text-sm text-gray-600">${t.color}</span>
    </div>
  `;

  const cornersDotOptions = `
    <div class="mb-5">
      <label class="block font-medium mb-2 text-gray-500">${t.cornersDotStyle}</label>
      ${StyleButtons('cornersDot', options.cornersDotOptions.type)}
    </div>
    <div class="flex items-center gap-3">
      <input type="color" id="corners-dot-color" class="w-10 h-10 border border-gray-200 rounded cursor-pointer p-0.5" value="${options.cornersDotOptions.color}">
      <span class="text-sm text-gray-600">${t.color}</span>
    </div>
  `;

  const backgroundOptions = `
    <div class="mb-5">
      <label class="block font-medium mb-2 text-gray-500">${t.backgroundColor}</label>
      <div class="flex items-center gap-3">
        <input type="color" id="bg-color" class="w-10 h-10 border border-gray-200 rounded cursor-pointer p-0.5" value="${options.backgroundOptions.color}">
        <span class="text-sm text-gray-600">${t.color}</span>
      </div>
    </div>
  `;

  const stylePresets = `
    <div class="grid grid-cols-2 gap-2">
      <button class="preset-btn px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" data-preset="neon">${t.presetNeon}</button>
      <button class="preset-btn px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" data-preset="classic">${t.presetClassic}</button>
      <button class="preset-btn px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" data-preset="minimal">${t.presetMinimal}</button>
      <button class="preset-btn px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" data-preset="corporate">${t.presetCorporate}</button>
    </div>
  `;

  const logoPresets = `
    <div class="grid grid-cols-4 gap-2">
      <button class="logo-preset-btn p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" data-logo="whatsapp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </button>
      <button class="logo-preset-btn p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" data-logo="instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </button>
      <button class="logo-preset-btn p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" data-logo="wifi">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
      </button>
      <button class="logo-preset-btn p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors" data-logo="none">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `;

  return `
    <div class="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg overflow-hidden h-fit transition-colors duration-300">
      ${Accordion(t.mainOptions, mainOptions, true)}
      ${Accordion(t.stylePresets, stylePresets)}
      ${Accordion(t.logoPresets, logoPresets)}
      ${Accordion(t.dotsOptions, dotsOptions)}
      ${Accordion(t.cornersSquareOptions, cornersSquareOptions)}
      ${Accordion(t.cornersDotOptions, cornersDotOptions)}
      ${Accordion(t.backgroundOptions, backgroundOptions)}
    </div>
  `;
}
