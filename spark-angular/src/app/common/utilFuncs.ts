export function formatPrice(price: number) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'DZD' }).format(price)
  }