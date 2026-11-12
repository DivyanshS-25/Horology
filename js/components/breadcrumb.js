// HOROLOGY — Breadcrumb Component
export function renderBreadcrumbs(items = []) {
  if (!items.length) return '';

  return `
    <nav class="breadcrumb-nav" aria-label="Breadcrumbs">
      ${items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        if (isLast) {
          return `<span style="color: var(--color-text-primary);" aria-current="page">${item.label}</span>`;
        }
        return `
          <a href="${item.href}">${item.label}</a>
          <span class="breadcrumb-separator" aria-hidden="true">/</span>
        `;
      }).join('')}
    </nav>
  `;
}
