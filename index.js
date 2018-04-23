var deck = [];
var suits = {
  Spades: 0,
  Clubs: 1,
  Hearts: 2,
  Diamonds: 3
}
var gameType = 0;


def function BuildDeck {
  foreach(suits) {
    while  (i = 0, i < 14, i++) {
      var card={"suit":suits,
      "value":i};
      deck.push(card);
    }
  }
}

def function computerTurn {
  
}
