import { Store } from "./src/store";
import { DiscountOffer } from "./src/Offers";

import fs from "fs";

describe("Store", () => {
  it("should be able to create store without discount", () => {
    expect(new Store().updateDiscounts()).toEqual([]);
  });

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

  it("should not decrease the discount under 0", () => {
    expect(
      new Store([new DiscountOffer("test", 10, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 9, 0)]);
  });

  it("should not decrease the discount under 0 even after expiration date", () => {
    expect(
      new Store([new DiscountOffer("test", 0, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", -1, 0)]);
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

describe("Naturalia", () => {
  it("should increase the discount", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 2, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 1, 11)]);
  });

  it("should increase the discount twice faster after expiration date", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 0, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", -1, 12)]);
  });

  it("should increase the discount twice faster after expiration date", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 0, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", -1, 12)]);
  });

  it("should not increase the discount beyond 50", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 10, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 9, 50)]);
  });

  it("should not increase the discount beyond 50 even after expiration date", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 0, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", -1, 50)]);
  });
});

describe("Ilek", () => {
  it("should not decrease the discount nor expiresIn", () => {
    expect(
      new Store([new DiscountOffer("Ilek", 10, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Ilek", 10, 10)]);
  });

  it("should not decrease the discount nor expiresIn even after expiration date", () => {
    expect(
      new Store([new DiscountOffer("Ilek", -1, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Ilek", -1, 10)]);
  });
});

describe("Vinted", () => {
  it("should increase the discount", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 20, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 19, 11)]);
  });

  it("should increase the discount by 2 if 5 < expiresIn <= 10", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 10, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 9, 12)]);
  });

  it("should increase the discount by 3 if expiresIn <= 5", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 5, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 4, 13)]);
  });

  it("should not increase the discount beyond 50", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 20, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 19, 50)]);
  });

  it("should not increase the discount beyond 50 even with expiresIn < 10", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 10, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 9, 50)]);
  });

  it("should not increase the discount beyond 50 even with expiresIn < 5", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 5, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 4, 50)]);
  });

  it("should set the discount to 0 after expiration date", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 0, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", -1, 0)]);
  });
});

describe("BackMarket", () => {
  it("should decrease the discount twice fast", () => {
    expect(
      new Store([new DiscountOffer("BackMarket", 5, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BackMarket", 4, 8)]);
  });

  it("should decrease the discount twice fast after expiration date", () => {
    expect(
      new Store([new DiscountOffer("BackMarket", -1, 10)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BackMarket", -2, 6)]);
  });

  it("should not decrease the discount under 0", () => {
    expect(
      new Store([new DiscountOffer("BackMarket", 10, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BackMarket", 9, 0)]);
  });

  it("should not decrease the discount under 0 even after expiration date", () => {
    expect(
      new Store([new DiscountOffer("BackMarket", 0, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BackMarket", -1, 0)]);
  });
});
