class Ship {
    #length;
    #hits;

    constructor(length) {
        this.#length = length > 0 ? length : 1;
        this.#hits = 0;
    }

    hit() {
        if (this.#hits < this.#length)
            this.#hits += 1;
    }

    isSunk() {
        return this.#hits >= this.#length;
    }

    get length() {
        return this.#length;
    }

    get hits() {
        return this.#hits;
    }
}

module.exports = Ship;
