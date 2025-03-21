/**
 * Format a number as currency
 * @param {number} value - The value to format
 * @param {string} currency - The currency symbol (default: ₹)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = "₹") => {
  return `${currency}${parseFloat(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

/**
 * Format a percentage
 * @param {number} value - The value to format (0.5 = 50%)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 2) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format a date string
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  // Handle Timestamp format from Python/Pandas
  if (dateString.includes("Timestamp")) {
    dateString = dateString.replace(/Timestamp\('([^']+)'\)/, "$1");
  }

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString();
};

export default {
  formatCurrency,
  formatPercentage,
  formatDate,
};
