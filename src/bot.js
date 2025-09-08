const Player = require("./player");

class Bot {
    #player;

    constructor() {
        this.#player = new Player;
    }

    canAttack(coords) {
        return this.#player.canAttack(coords);
    }

    attack(enemy) {
        if (enemy.isGameOver())
            return;
        let coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        while (!enemy.canAttack(coords))
            coords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        enemy.receiveAttack(coords);
    }

    receiveAttack(coords) {
        this.#player.receiveAttack(coords);
    }

    isGameOver() {
        return this.#player.isGameOver();
    }

    get opp_view() {
        return this.#player.opp_view;
    }

    get own_view() {
        return this.#player.own_view;
    }
}

module.exports = Bot;
