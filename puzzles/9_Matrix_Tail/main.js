var fs = require("fs");
var input = fs.readFileSync("./puzzles/9_Matrix_Tail/input.txt", "utf-8");
var inputSplit = input.split("\n");

const math = require('mathjs');

let size = 1000;
let center = 499;
const identityMatrix = math.zeros(size, size);
var headIndex = [center, center];
var tailIndex = [center, center];
identityMatrix.set(tailIndex, 1);
inputSplit.forEach(function (line) {
  var line = line.replace("\r", "").split(" ");
  var direction = line[0];
  var steps = Number(line[1]);
  var moveIndex;
  //right
  if (direction == "R") {
    for (var y = headIndex[1]; y < headIndex[1] + steps; y++) {
      moveIndex = [headIndex[0], y + 1];
      var dist = Math.sqrt( Math.pow((moveIndex[0]-tailIndex[0]), 2) + Math.pow((moveIndex[1]-tailIndex[1]), 2) );
      if (dist >= 2) {
        tailIndex = [moveIndex[0], y];
        identityMatrix.set(tailIndex, 1);
      }
    }
    headIndex = moveIndex;
  }
  //left
  if (direction == "L") {
    for (var y = headIndex[1]; y > headIndex[1] - steps; y--) {
      moveIndex = [headIndex[0], y - 1];
      var dist = Math.sqrt( Math.pow((moveIndex[0]-tailIndex[0]), 2) + Math.pow((moveIndex[1]-tailIndex[1]), 2) );
      if (dist >= 2) {
        tailIndex = [moveIndex[0], y];
        identityMatrix.set(tailIndex, 1);
      }
    }
    headIndex = moveIndex;
  }
  //down
  if (direction == "D") {
    for (var x = headIndex[0]; x < headIndex[0] + steps; x++) {
      moveIndex = [x + 1, headIndex[1]];
      var dist = Math.sqrt( Math.pow((moveIndex[0]-tailIndex[0]), 2) + Math.pow((moveIndex[1]-tailIndex[1]), 2) );
      if (dist >= 2) {
        tailIndex = [x, moveIndex[1]];
        identityMatrix.set(tailIndex, 1);
      }
    }
    headIndex = moveIndex;
  }
  //up
  if (direction == "U") {
    for (var x = headIndex[0]; x > headIndex[0] - steps; x--) {
      moveIndex = [x - 1, headIndex[1]];
      var dist = Math.sqrt( Math.pow((moveIndex[0]-tailIndex[0]), 2) + Math.pow((moveIndex[1]-tailIndex[1]), 2) );
      if (dist >= 2) {
        tailIndex = [x, moveIndex[1]];
        identityMatrix.set(tailIndex, 1);
      }
    }
    headIndex = moveIndex;
  }
})

var partOneSum = 0;
identityMatrix.forEach(function (value) {
  partOneSum += value;
})

console.log("Part One Sum: " + partOneSum);