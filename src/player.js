const Gameboard = require("./gameboard");

class Player {
    #board;
    constructor(board = new Gameboard) {
        this.#board = board;
    }

    receiveAttack(coords) {
        this.#board.receiveAttack(coords);
    }

    isGameOver() {
        return this.#board.areAllShipsSunken();
    }

    canAttack(coords) {
        return this.#board.opp_view[coords[0]][coords[1]] == 'e';
    }

    get opp_view() {
        return this.#board.opp_view;
    }

    get own_view() {
        return this.#board.own_view;
    }
}

module.exports = Player;
