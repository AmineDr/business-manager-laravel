import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  locale = navigator.language
  constructor() {}

  formatPrice(price?: number | string) {
    if (typeof price === "undefined") return '0.00 DZD'
    let p: number = 0
    if (typeof price === "string") {
      p = parseInt(price)
    } else {
      p = price
    }
    return new Intl.NumberFormat(this.locale, { style: 'currency', currency: 'DZD' }).format(p)
  }

  formatDate(date?: Date | string) {
    if (typeof date === "undefined") return '01/01/2020 - 00:00'
    const d = new Date(date)
    return Intl.DateTimeFormat(this.locale, {hour: "2-digit", minute: "2-digit",hour12: true,day: "2-digit", month: "long", year: "numeric"}).format(d)
  }
}
