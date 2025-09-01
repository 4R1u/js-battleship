const Gameboard = require('../src/gameboard');
const Ship = require('../src/ship');

describe("two ships placed separately", () => {
    let board;

    beforeAll(() => {
        board = new Gameboard;
        board.place(new Ship(4), [1, 0], false);
        board.place(new Ship(5), [3, 3], true);
    });

    test("first ship placed", () => {
        expect(board.own_view[1][0]).toBe('s');
        expect(board.own_view[1][1]).toBe('s');
        expect(board.own_view[1][2]).toBe('s');
        expect(board.own_view[1][3]).toBe('s');
    });

    test("first ship can't be seen from the enemy's POV", () => {
        expect(board.opp_view[1][0]).toBe('e');
        expect(board.opp_view[1][1]).toBe('e');
        expect(board.opp_view[1][2]).toBe('e');
        expect(board.opp_view[1][3]).toBe('e');
    });

    test("second ship placed", () => {
        expect(board.own_view[3][3]).toBe('s');
        expect(board.own_view[4][3]).toBe('s');
        expect(board.own_view[5][3]).toBe('s');
        expect(board.own_view[6][3]).toBe('s');
        expect(board.own_view[7][3]).toBe('s');
    });

    test("second ship can't be seen from the enemy's POV", () => {
        expect(board.opp_view[3][3]).toBe('e');
        expect(board.opp_view[4][3]).toBe('e');
        expect(board.opp_view[5][3]).toBe('e');
        expect(board.opp_view[6][3]).toBe('e');
        expect(board.opp_view[7][3]).toBe('e');
    });

    test("ship list has two ships", () => {
        expect(board.ships.length).toBe(2);
    });
});

describe("placing ships on top of each other", () => {
    let board;

    beforeAll(() => {
        board = new Gameboard;
        board.place(new Ship(4), [0, 0], false);
        board.place(new Ship(4), [0, 0], true);
    });

    test("first ship placed", () => {
        expect(board.own_view[0][0]).toBe('s');
        expect(board.own_view[0][1]).toBe('s');
        expect(board.own_view[0][2]).toBe('s');
        expect(board.own_view[0][3]).toBe('s');
    });

    test("first ship can't be seen from the enemy's POV", () => {
        expect(board.opp_view[0][0]).toBe('e');
        expect(board.opp_view[0][1]).toBe('e');
        expect(board.opp_view[0][2]).toBe('e');
        expect(board.opp_view[0][3]).toBe('e');
    });

    test("second ship _not_ placed", () => {
        expect(board.own_view[0][0]).toBe('s');
        expect(board.own_view[1][0]).toBe('e');
        expect(board.own_view[2][0]).toBe('e');
        expect(board.own_view[3][0]).toBe('e');
    });

    test("ship list has one", () => {
        expect(board.ships.length).toBe(1);
    });
});

describe("missing a hit", () => {
    let board;

    beforeAll(() => {
        board = new Gameboard;
        board.receiveAttack([0, 0]);
    });

    test("is a miss", () => {
        expect(board.own_view[0][0]).toBe('m');
    });

    test("opponent sees miss", () => {
        expect(board.opp_view[0][0]).toBe('m');
    });
});

describe("sinking a horizontal ship", () => {
    let board;
    beforeAll(() => {
        board = new Gameboard;
        board.place(new Ship(4), [2, 3], false);
        board.receiveAttack([2, 3]);
        board.receiveAttack([2, 4]);
        board.receiveAttack([2, 5]);
        board.receiveAttack([2, 6]);
    });

    test("the spaces the ship occupy are marked as hit", () => {
        expect(board.own_view[2][3]).toBe('h');
        expect(board.own_view[2][4]).toBe('h');
        expect(board.own_view[2][5]).toBe('h');
        expect(board.own_view[2][6]).toBe('h');
    });

    test("opponent sees hits", () => {
        expect(board.opp_view[2][3]).toBe('h');
        expect(board.opp_view[2][4]).toBe('h');
        expect(board.opp_view[2][5]).toBe('h');
        expect(board.opp_view[2][6]).toBe('h');
    });

    test("ship is sunken", () => {
        expect(board.ships[0][0].isSunk()).toBe(true);
    });
});

describe("sinking a vertical ship", () => {
    let board;
    beforeAll(() => {
        board = new Gameboard;
        board.place(new Ship(4), [3, 2], true);
        board.receiveAttack([3, 2]);
        board.receiveAttack([4, 2]);
        board.receiveAttack([5, 2]);
        board.receiveAttack([6, 2]);
    });

    test("the spaces the ship occupy are marked as hit", () => {
        expect(board.own_view[3][2]).toBe('h');
        expect(board.own_view[4][2]).toBe('h');
        expect(board.own_view[5][2]).toBe('h');
        expect(board.own_view[6][2]).toBe('h');
    });

    test("opponent sees hits", () => {
        expect(board.opp_view[3][2]).toBe('h');
        expect(board.opp_view[4][2]).toBe('h');
        expect(board.opp_view[5][2]).toBe('h');
        expect(board.opp_view[6][2]).toBe('h');
    });

    test("ship is sunken", () => {
        expect(board.ships[0][0].isSunk()).toBe(true);
    });

    test("reports all ships sunken", () => {
        expect(board.areAllShipsSunken()).toBe(true);
    });
});

describe("attacking and missing", () => {
    let board;
    beforeAll(() => {
        board = new Gameboard;
        board.receiveAttack([3, 2]);
        board.receiveAttack([4, 2]);
        board.receiveAttack([5, 2]);
        board.receiveAttack([6, 2]);
    });

    test("the spaces hit are marked as misses", () => {
        expect(board.opp_view[3][2]).toBe('m');
        expect(board.opp_view[4][2]).toBe('m');
        expect(board.opp_view[5][2]).toBe('m');
        expect(board.opp_view[6][2]).toBe('m');
    });
});
