const Ship = require('../src/ship');

describe("when never hit", () => {
    let ship;

    beforeAll(() => {
        ship = new Ship(5);
    });

    test("hits is zero", () => {
        expect(ship.hits).toBe(0);
    });

    test("not sunk", () => {
        expect(ship.isSunk()).toBe(false);
    });
});

describe("when hit once", () => {
    let ship;

    beforeAll(() => {
        ship = new Ship(5);
        ship.hit();
    });

    test("says hit once", () => {
        expect(ship.hits).toBe(1);
    });

    test("not sunk", () => {
        expect(ship.isSunk()).toBe(false);
    });
});

describe("when hit 4 times, being 4 units long", () => {
    let ship;
    const length = 4;

    beforeAll(() => {
        ship = new Ship(length);
        for (let i = 0; i < length; ++i)
            ship.hit();
    });

    test("hit as many times as many units the ship is long", () => {
        expect(ship.hits).toBe(length);
    });

    test("is sunk", () => {
        expect(ship.isSunk()).toBe(true);
    });
});
