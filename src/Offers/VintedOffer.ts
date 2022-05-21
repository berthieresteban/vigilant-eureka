import { DiscountOffer } from "./DiscountOffer";

export class VintedOffer extends DiscountOffer {
  constructor(
    partnerName: string,
    expiresIn: number,
    discountInPercent: number
  ) {
    super(partnerName, expiresIn, discountInPercent);
  }
  updateDiscount() {
    this.expiresIn--;

    if (this.expiresIn < 0) {
      this.discountInPercent = 0;
    } else if (this.expiresIn <= 5) {
      this.discountInPercent += 3;
    } else if (this.expiresIn <= 10) {
      this.discountInPercent += 2;
    } else {
      this.discountInPercent += 1;
    }
    if (this.discountInPercent > 50) {
      this.discountInPercent = 50;
    }
  }
}
