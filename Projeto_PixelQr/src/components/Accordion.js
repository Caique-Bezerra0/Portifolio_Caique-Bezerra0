export function Accordion(title, content, isOpen = false) {
  return `
    <div class="accordion-item border-b border-[var(--color-border)] ${isOpen ? 'active' : ''}">
      <button class="accordion-header w-full px-5 py-4 bg-[var(--color-accordion-header)] flex items-center justify-between cursor-pointer border-none font-semibold text-[15px] text-[var(--color-text-primary)] hover:opacity-90 transition-colors duration-300">
        ${title}
        <span class="arrow transition-transform duration-300 text-[var(--color-text-secondary)]" style="${isOpen ? 'transform: rotate(180deg);' : ''}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </button>
      <div class="accordion-content overflow-hidden transition-[max-height] duration-300 ease-out bg-[var(--color-bg-secondary)]" style="${isOpen ? 'max-height: 1000px;' : 'max-height: 0;'}">
        <div class="p-5 border-t border-[var(--color-border)]">
          ${content}
        </div>
      </div>
    </div>
  `;
}
