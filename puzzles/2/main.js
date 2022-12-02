var fs = require("fs");
var input = fs.readFileSync("./puzzles/2/input.txt", "utf-8");
var inputByRound = input.split("\n");

function getOutcomePoint(opponent, me) {
    if (opponent == "A" && me == "Y") {
        return 6;
    }
    if (opponent == "B" && me == "Z") {
        return 6;
    }
    if (opponent == "C" && me == "X") {
        return 6;
    }
    if (opponent == "A" && me == "X") {
        return 3;
    }
    if (opponent == "B" && me == "Y") {
        return 3;
    }
    if (opponent == "C" && me == "Z") {
        return 3;
    }
    return 0;
}

function getShapePoint(shape) {
    switch(shape) {
        case "A":
        case "X":
            return 1;
        case "B":
        case "Y":
            return 2;
        case "C":
        case "Z":
            return 3;
    }
}

function getNeededHand(opponent, me) {
    // Draw
    if (opponent == "A" && me == "Y") {
        return "X";
    }
    if (opponent == "B" && me == "Y") {
        return "Y";
    }
    if (opponent == "C" && me == "Y") {
        return "Z";
    }
    // Lose
    if (opponent == "A" && me == "X") {
        return "Z";
    }
    if (opponent == "B" && me == "X") {
        return "X";
    }
    if (opponent == "C" && me == "X") {
        return "Y";
    }
    // Win
    if (opponent == "A" && me == "Z") {
        return "Y";
    }
    if (opponent == "B" && me == "Z") {
        return "Z";
    }
    if (opponent == "C" && me == "Z") {
        return "X";
    }
}

var scoreSumOne = 0;
var scoreSumTwo = 0;
inputByRound.forEach(function(round) {
    var hands = round.replace("\r", "").split(" ");
    var opponent = hands[0];
    var me = hands[1];

    var score = getOutcomePoint(opponent, me) + getShapePoint(me);
    scoreSumOne = scoreSumOne + score;

    var meNeeded = getNeededHand(opponent, me);
    score = getOutcomePoint(opponent, meNeeded) + getShapePoint(meNeeded);
    scoreSumTwo = scoreSumTwo + score;
});

console.log("Part One Total score: " + (scoreSumOne));
console.log("Part Two Total score: " + (scoreSumTwo));