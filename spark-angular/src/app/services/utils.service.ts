import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatPrice(price?: number | string) {
    if (typeof price === "undefined") return '0.00 DZD'
    let p: number = 0
    if (typeof price === "string") {
      p = parseInt(price)
    } else {
      p = price
    }
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'DZD' }).format(p)
  }

  formatDate(date?: Date | string) {
    if (typeof date === "undefined") return '01/01/2020 - 00:00'
    const d = new Date(date)
    const m = d.getMinutes()
    const h = d.getHours()
    return `${d.toDateString()} at ${(h / 10) >= 1 ? h : '0'+h}:${(m / 10) >= 1 ? m : '0'+m}`
  }
}
