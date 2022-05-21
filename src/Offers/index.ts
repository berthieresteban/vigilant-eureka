import DiscountOffer from "./DiscountOffer";
import DynamicOffer from "./DynamicOffer";
import * as OffersTypes from "./OffersTypes";

const Offers: any = {
  DiscountOffer,
  ...OffersTypes
};

export { Offers, DiscountOffer, DynamicOffer };
