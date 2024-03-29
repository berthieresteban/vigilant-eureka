import DiscountOffer from "../DiscountOffer";

export class BackMarketOffer extends DiscountOffer {
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
      this.discountInPercent -= 4;
    } else {
      this.discountInPercent -= 2;
    }
    this.afterUpdateDiscount();
  }
}
