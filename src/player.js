const Gameboard = require("./gameboard");

class Player {
    #board;
    constructor(board = Gameboard.new) {
        this.#board = board;
    }

    receiveAttack(coords) {
        this.#board.receiveAttack(coords);
    }

    isGameOver() {
        return this.#board.areAllShipsSunken();
    }
}

module.exports = Player;
