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
}

module.exports = Bot;
