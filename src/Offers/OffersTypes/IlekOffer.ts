import DiscountOffer from "../DiscountOffer";

export class IlekOffer extends DiscountOffer {
  constructor(
    partnerName: string,
    expiresIn: number,
    discountInPercent: number
  ) {
    super(partnerName, expiresIn, discountInPercent);
  }
  updateDiscount() {}
}
