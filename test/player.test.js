const Gameboard = require('../src/gameboard');
const Player = require('../src/player');
const Ship = require('../src/ship');


describe("after placing one ship of two blocks", () => {
    let player;
    beforeAll(() => {
        let board = new Gameboard;
        board.place(new Ship(2), [0, 0], false);
        player = new Player(board);
    });

    test("receives attack", () => {
        player.receiveAttack([0, 0]);
    });

    test("game not over", () => {
        expect(player.isGameOver()).toBe(false);
    });

    test("receives attack", () => {
        player.receiveAttack([0, 1]);
    });

    test("game over", () => {
        expect(player.isGameOver()).toBe(true);
    });
});
