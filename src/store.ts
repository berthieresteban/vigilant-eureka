import { DiscountOffer, DynamicOffer } from "./Offers";

export class Store {
  discountOffers: Array<any>;

  constructor(discountOffers: Array<DiscountOffer> = []) {
    this.discountOffers = discountOffers.map(offer => {
      return new DynamicOffer(
        offer.partnerName,
        offer.expiresIn,
        offer.discountInPercent
      );
    });
  }
  updateDiscounts() {
    this.discountOffers.forEach(discountOffer =>
      discountOffer.updateDiscount()
    );
    return this.discountOffers;
  }
}
