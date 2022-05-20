export class DiscountOffer {
  constructor(partnerName, expiresIn, discountInPercent) {
    if (discountInPercent > 50) {
      throw new Error("Discount must be lower than 50");
    }
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountInPercent;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  getModificatorSign(offer) {
    if (["Naturalia", "Vinted"].includes(offer.partnerName)) {
      return 1;
    }
    return -1;
  }
  getDiscountModificatorValue(offer) {
    if (offer.partnerName === "Vinted") {
      if (offer.expiresIn <= 5) {
        return 3;
      }
      if (offer.expiresIn <= 10) {
        return 2;
      }
      return 1;
    }
    if (offer.partnerName === "Ilek") {
      return 0;
    }
    if (offer.partnerName === "Naturalia") {
      return offer.expiresIn > 0 ? 1 : 2;
    }
    if (offer.expiresIn <= 0) {
      return 2;
    }
    return 1;
  }
  updateDiscounts() {
    this.discountOffers = this.discountOffers.map(offer => {
      const modificatorSign = this.getModificatorSign(offer);
      const modificatorValue = this.getDiscountModificatorValue(offer);
      const modificator = modificatorValue * modificatorSign;

      if (offer.partnerName != "Ilek") {
        offer.expiresIn = offer.expiresIn - 1;
      }
      if (offer.partnerName === "Vinted" && offer.expiresIn < 0) {
        offer.discountInPercent = 0;
        return offer;
      }

      offer.discountInPercent = offer.discountInPercent + modificator;
      if (offer.discountInPercent > 50) {
        offer.discountInPercent = 50;
      }
      if (offer.discountInPercent < 0) {
        offer.discountInPercent = 0;
      }

      return offer;
    });

    return this.discountOffers;
  }
}
