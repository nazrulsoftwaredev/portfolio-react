export const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export const formatCompactCurrency = (value: number) =>
  value >= 1000 ? `$${(value / 1000).toFixed(1)}K` : formatCurrency(value);
