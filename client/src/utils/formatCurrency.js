/**
 * Format a number as Indian Rupees currency string
 * @param {number} amount - The amount to format
 * @param {boolean} showSymbol - Whether to show the ₹ symbol (default: true)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSymbol = true) => {
  if (isNaN(amount) || amount === null || amount === undefined) return "₹0";

  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return showSymbol ? formatted : formatted.replace("₹", "").trim();
};

/**
 * Format price with optional decimal places
 * @param {number} amount
 * @param {number} decimals
 * @returns {string}
 */
export const formatPrice = (amount, decimals = 0) => {
  return `₹${Number(amount).toFixed(decimals)}`;
};

export default formatCurrency;