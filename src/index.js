import "./styles.css";

const Bot = require('./bot');
const Gameboard = require('./gameboard');
const Player = require('./player');
const Ship = require('./ship');

let player = new Player;
let bot = new Bot;

const botLogic = (function (doc) {
    const isGameOver = function () {
        return bot.isGameOver() || player.isGameOver();
    };

    const botSquareButton = function (event) {
        event.preventDefault();
        const coords = event.target.dataset;
        bot.receiveAttack([coords.i, coords.j]);
        bot.attack(player);
        boardRenderer.drawBoards();
        event.stopPropagation();
    };

    return { isGameOver, botSquareButton };
})(document);

const boardRenderer = (function (doc) {
    const drawBoard = function (num, player, own_view) {
        const boardArea = doc.querySelector(`.board-${num}`);
        const playerBoard = own_view ? player.own_view : player.opp_view;
        boardArea.textContent = "";
        for (let i = 0; i < 10; ++i)
            for (let j = 0; j < 10; ++j) {
                const littleSquare = doc.createElement("button");
                littleSquare.type = "button";
                littleSquare.classList.add("square");
                littleSquare.classList.add(`square-${playerBoard[i][j]}`);
                littleSquare.classList.add(own_view ? "friendly" : "enemy");
                littleSquare.dataset.i = i;
                littleSquare.dataset.j = j;
                if (!own_view && playerBoard[i][j] == 'e' && !botLogic.isGameOver())
                    littleSquare.addEventListener("click", botLogic.botSquareButton);
                boardArea.appendChild(littleSquare);
            }
    };

    const drawBoards = function () {
        drawBoard(1, player, true);
        drawBoard(2, bot, false);
    };

    return { drawBoards };
})(document);

document.querySelector(".restart").addEventListener("click", () => {
    player = new Player;
    bot = new Bot;
    boardRenderer.drawBoards();
});

boardRenderer.drawBoards();
