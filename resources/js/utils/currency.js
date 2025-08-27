export const formatCurrency = (amount) => {
    const numericAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericAmount);
};

export const formatCurrencyWithSymbol = (amount) => {
    const numericAmount = parseFloat(amount) || 0;
    return `R$ ${formatCurrency(numericAmount)}`;
};