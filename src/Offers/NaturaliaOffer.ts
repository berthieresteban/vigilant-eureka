import { DiscountOffer } from "./DiscountOffer";

export class NaturaliaOffer extends DiscountOffer {
  constructor(
    partnerName: string,
    expiresIn: number,
    discountInPercent: number
  ) {
    super(partnerName, expiresIn, discountInPercent);
  }
  updateDiscount() {
    this.expiresIn--;

    if (this.expiresIn >= 0) {
      this.discountInPercent += 1;
    } else {
      this.discountInPercent += 2;
    }
    if (this.discountInPercent >= 50) {
      this.discountInPercent = 50;
    }
  }
}
