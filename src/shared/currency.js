export const currencyLAK = (LAK) => {
    return Intl.NumberFormat('la-LA', { style: 'currency', currency: 'Kip' }).format(LAK)
}