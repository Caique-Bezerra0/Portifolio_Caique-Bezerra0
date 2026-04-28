export function StyleButtons(category, activeType) {
  const styles = {
    dots: ['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'],
    cornersSquare: ['none', 'square', 'dot', 'extra-rounded'],
    cornersDot: ['none', 'square', 'dot']
  };

  const currentStyles = styles[category] || [];

  return `
    <div class="grid grid-cols-3 gap-2">
      ${currentStyles.map(type => `
        <button class="style-btn ${category}-style-btn p-2.5 border border-gray-200 rounded-lg bg-white cursor-pointer flex flex-col items-center gap-1 text-[11px] transition-all hover:border-[#3b82f6] ${activeType === type ? 'active border-[#3b82f6] bg-[#e8f0fe] text-[#3b82f6]' : ''}" data-type="${type}">
          <div class="w-8 h-8 bg-gray-100 rounded"></div>
          <span class="capitalize">${type.replace('-', ' ')}</span>
        </button>
      `).join('')}
    </div>
  `;
}
