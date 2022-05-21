import { Offers } from ".";

export default class DynamicOffer {
  constructor(
    partnerName: string,
    expiresIn: number,
    discountInPercent: number
  ) {
    let offer = partnerName + "Offer";
    if (Offers[offer] === undefined || Offers[offer] === null) {
      offer = "DiscountOffer";
    }
    return new Offers[offer](partnerName, expiresIn, discountInPercent);
  }
}
