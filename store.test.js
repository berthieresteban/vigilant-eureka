import { Store } from "./src/store";
import { DiscountOffer } from "./src/Offers";

import fs from "fs";

describe("Store", () => {
  it("should throw if a discount is > 50", () => {
    expect(() =>
      new Store([new DiscountOffer("test", 10, 60)]).updateDiscounts()
    ).toThrowError("Discount must be lower than 50");
  });

  it("should decrease the discount and expiresIn", () => {
    expect(
      new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 1, 2)]);
  });

  it("should decrease the discount twice fast after expiresIn date has passed", () => {
    expect(
      new Store([new DiscountOffer("test", 0, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", -1, 8)]);
  });

  it("should increase the discount for Naturalia", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 2, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 1, 11)]);
  });

  it("should increase the discount twice faster after expiration date for Naturalia", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 0, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", -1, 12)]);
  });

  it("should increase the discount twice faster after expiration date for Naturalia", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 0, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", -1, 12)]);
  });

  it("should not decrease the discount nor expiresIn for Ilek", () => {
    expect(
      new Store([new DiscountOffer("Ilek", 10, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Ilek", 10, 10)]);
  });

  it("should increase the discount for Vinted", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 20, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 19, 11)]);
  });

  it("should increase the discount by 2 if 5 < expiresIn <= 10  for Vinted", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 10, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 9, 12)]);
  });

  it("should increase the discount by 3 if expiresIn <= 5  for Vinted", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 5, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 4, 13)]);
  });

  it("should decrease the discount twice fast for BackMarket", () => {
    expect(
      new Store([new DiscountOffer("BackMarket", 5, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BackMarket", 4, 8)]);
  });

  it("should decrease the discount twice fast after expiration date for BackMarket", () => {
    expect(
      new Store([new DiscountOffer("BackMarket", -1, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BackMarket", -2, 6)]);
  });

  it("should get the exact same result for the provided sample data", () => {
    const discountOffers = [
      new DiscountOffer("Velib", 20, 30),
      new DiscountOffer("Naturalia", 10, 5),
      new DiscountOffer("Vinted", 5, 40),
      new DiscountOffer("Ilek", 15, 40)
    ];
    const store = new Store(discountOffers);
    const result = fs.readFileSync("./correct-output.txt", {
      encoding: "utf8"
    });
    const log = [];
    for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
      log.push(JSON.stringify(store.updateDiscounts()));
    }
    expect(log.toString()).toEqual(result);
  });
});
