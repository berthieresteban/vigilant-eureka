export default class DiscountOffer {
  partnerName: string;
  expiresIn: number;
  discountInPercent: number;

  constructor(
    partnerName: string,
    expiresIn: number,
    discountInPercent: number
  ) {
    if (discountInPercent > 50) {
      throw new Error("Discount must be lower than 50");
    }
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountInPercent;
  }
  afterUpdateDiscount() {
    if (this.discountInPercent <= 0) {
      this.discountInPercent = 0;
    }
    if (this.discountInPercent >= 50) {
      this.discountInPercent = 50;
    }
  }
  updateDiscount() {
    this.expiresIn--;

    if (this.expiresIn < 0) {
      this.discountInPercent -= 2;
    } else {
      this.discountInPercent--;
    }
    this.afterUpdateDiscount();
  }
}
