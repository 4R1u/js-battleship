const Ship = require('./ship');

class Gameboard {
    #board;
    #ships;
    constructor(place_ships = true) {
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

        if (place_ships) {
            const ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
            for (let i = 0; i < 5; ++i) {
                while (this.#ships.length == i)
                    this.place(ships[i], [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)], (Math.random() < 0.5));
            }
        }
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
        const own_view = [];
        for (let i = 0; i < 10; ++i) {
            own_view.push([])
            for (let j = 0; j < 10; ++j)
                own_view[i].push(this.#board[i][j]);
        }
        return own_view;
    }

    get opp_view() {
        const opp_view = this.own_view;
        for (let i = 0; i < 10; ++i)
            for (let j = 0; j < 10; ++j)
                if (opp_view[i][j] == 's') opp_view[i][j] = 'e';

        return opp_view;
    }

    receiveAttack(coords) {
        if (['h', 'm'].includes(this.#board[coords[0]][coords[1]]))
            return;
        else if (this.#board[coords[0]][coords[1]] == 'e') {
            this.#board[coords[0]][coords[1]] = 'm';
            return;
        } else if (this.#board[coords[0]][coords[1]] == 's') {
            this.#board[coords[0]][coords[1]] = 'h';
            for (let ship of this.#ships)
                if ((!ship[2] && ship[1][0] == coords[0] && ship[1][1] <= coords[1] && ship[1][1] + ship[0].length > coords[1]) ||
                    ((ship[2] && ship[1][1] == coords[1] && ship[1][0] <= coords[0] && ship[1][0] + ship[0].length > coords[0]))) {
                    ship[0].hit();
                    break;
                }
        }
    }

    areAllShipsSunken() {
        for (let ship of this.#ships)
            if (false == ship[0].isSunk())
                return false;

        return true;
    }
}

module.exports = Gameboard;
