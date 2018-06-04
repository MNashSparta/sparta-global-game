# Sparta-Global-Game

## Summary
This project was created for Sparta Global. The aim was to create a browser based game of Mancala, an old African board game with many variations.

## Prerequisites
All of the external libraries are already attached using a CDN. However, if there are issues, this site makes use of:

- [Bootstrap 3.3.7](https://getbootstrap.com/docs/3.3/getting-started/)
- [JQuery 3.3.1](http://jquery.com/download/)

## Instructions
Mancala is an old African board game with many variations.
The aim of the game is to have more pieces in your end scoring zone, the Mancala, than your opponent.

Players take turns to choose a section from their side of the board to play. All of the stones from that section are removed and one is placed in each of the following holes going anti-clockwise until none are left.

If the last stone placed falls into the Mancala, that player gets another turn.

If the player chooses a section with enough zones to fully wrap around onto their side of the board again AND the last stone falls into an empty space, the player "captures the stones in the opponents section that is directly opposite. This means that all of the stones in that section and the last stone placed get captured and put into that players Mancala.

If a player ends up with no stones left on their side of the board and they haven't already scored more than half the points, they automatically lose.


## Site details
Upon loading, background music will automatically play and the relevant assets will load, allowing the player to start playing immediately.

There is a reset button which can be pressed at any time to begin a new game.
