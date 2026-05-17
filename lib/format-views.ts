/** Formato visualizzazioni (es. 17,9K · 17,9 MLN) */
export function formatViewsCount(count: number): string {
  const n = Math.max(0, Math.floor(count));
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${formatDecimal(v)} MLN`;
  }
  if (n >= 10_000) {
    const v = n / 1_000;
    return `${formatDecimal(v)} K`;
  }
  return n.toLocaleString("it-IT");
}

function formatDecimal(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  const str = rounded.toFixed(1);
  return str.endsWith(".0") ? String(Math.round(rounded)) : str.replace(".", ",");
}
