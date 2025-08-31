class Gameboard {
    #board;
    #ships;
    constructor() {
        this.#board =
            [
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
                ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',],
            ];
        this.#ships = [];
    }

    place(ship, coords, isVertical) {
        const length = ship.length;
        // is there space for the ship?
        for (let i = 0; i < length; ++i)
            if (i + coords[0] >= 10 || i + coords[1] >= 10 || this.#board[coords[0] + (isVertical ? i : 0)][coords[1] + (isVertical ? 0 : i)] != 'e')
                return;
        this.#ships.push([ship, coords, isVertical]);
        for (let i = 0; i < length; ++i)
            this.#board[coords[0] + (isVertical ? i : 0)][coords[1] + (isVertical ? 0 : i)] = 's';
    }

    get ships() {
        return this.#ships;
    }

    get own_view() {
        return this.#board;
    }

    receiveAttack(coords) {
        if (['h', 'm'].includes(this.#board[coords[0]][coords[1]]))
            return;
        else if (this.#board[coords[0]][coords[1]] == 'e') {
            this.#board[coords[0]][coords[1]] = 'm';
            return;
        } else if (this.#board[coords[0]][coords[1]] == 's') {
            this.#board[coords[0]][coords[1]] = 'h';
            for (ship of this.#ships)
                if ((!ship[2] && ship[1][0] == coords[0] && ship[1][1] <= coords[1] && ship[1][1] + ship[0].length > coords[1]) ||
                    ((ship[2] && ship[1][1] == coords[1] && ship[1][0] <= coords[0] && ship[1][0] + ship[0].length > coords[0]))) {
                    ship[0].hit();
                    break;
                }
        }
    }
}

module.exports = Gameboard;
