import "./styles.css";

const Bot = require('./bot');
const Gameboard = require('./gameboard');
const Player = require('./player');
const Ship = require('./ship');

let player = new Player;
let bot = new Bot;

const boardRenderer = (function (doc) {
    const drawBoard = function (num, player, own_view) {
        const boardArea = doc.querySelector(`.board-${num}`);
        const playerBoard = own_view ? player.own_view : player.opp_view;
        for (let i = 0; i < 10; ++i)
            for (let j = 0; j < 10; ++j) {
                const littleSquare = doc.createElement("button");
                littleSquare.type = "button";
                littleSquare.classList.add("square");
                littleSquare.classList.add(`square-${playerBoard[i][j]}`);
                littleSquare.classList.add(own_view ? "friendly" : "enemy");
                boardArea.appendChild(littleSquare);
            }
    };

    return { drawBoard };
})(document);

boardRenderer.drawBoard(1, player, true);
boardRenderer.drawBoard(2, bot, false);
