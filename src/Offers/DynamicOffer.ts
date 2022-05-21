import { Offers } from ".";

export class DynamicOffer {
  constructor(
    className: string,
    partnerName: string,
    expiresIn: number,
    discountInPercent: number
  ) {
    let offer = className + "Offer";
    if (Offers[offer] === undefined || Offers[offer] === null) {
      offer = "DiscountOffer";
    }
    return new Offers[offer](partnerName, expiresIn, discountInPercent);
  }
}
