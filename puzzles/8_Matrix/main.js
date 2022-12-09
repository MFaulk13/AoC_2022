var fs = require("fs");
var input = fs.readFileSync("./puzzles/8_Matrix/input.txt", "utf-8");
var inputSplit = input.split("\n");

const math = require('mathjs');
const matrix = math.matrix([]);
inputSplit.forEach(function (line, i) {
  var line = line.replace("\r", "");
  var digits = line.toString().split('');
  var row = digits.map(Number)
  row.forEach(function (value, j) {
    matrix.set([i, j], value);
  })
})

const identityMatrix = math.matrix([]);
function MoveHead(value, index, treeBesidesIndex) {
  var treeBesides = matrix.get(treeBesidesIndex);
  if (treeBesides < value) {
    identityMatrix.set(index, 1);
  } else {
    identityMatrix.set(index, 0);
  }
}

const scenicSumMatrix = math.matrix([]);
var matrixSize = matrix.size().map(i => i-1);
var score;
inputSplit.forEach(function (line, i) {
  var line = line.replace("\r", "");
  var visible = false;
  score = 1;
  //right
  var sum = 0;
  for (var y = index[1] + 1; y <= matrixSize[1]; y++) {
    var treeBesidesIndex = [index[0], y];
    visible = setIdentityMatrix(value, index, treeBesidesIndex);
    sum = Math.abs(index[1] - y);
    if (!visible) {
      break;
    }
  }
  score = score * sum;
  //left
  sum = 0;
  for (var y = index[1] - 1; y >= 0; y--) {
    var treeBesidesIndex = [index[0], y];
    visible = setIdentityMatrix(value, index, treeBesidesIndex);
    sum = Math.abs(index[1] - y);
    if (!visible) {
      break;
    }
  }
  score = score * sum;
  //down
  sum = 0;
  for (var x = index[0] + 1; x <= matrixSize[0]; x++) {
    var treeBesidesIndex = [x, index[1]];
    visible = setIdentityMatrix(value, index, treeBesidesIndex);
    sum = Math.abs(index[0] - x);
    if (!visible) {
      break;
    }
  }
  score = score * sum;
  //up
  sum = 0;
  for (var x = index[0] - 1; x >= 0; x--) {
    var treeBesidesIndex = [x, index[1]];
    visible = setIdentityMatrix(value, index, treeBesidesIndex);
    sum = Math.abs(index[0] - x);
    if (!visible) {
      break;
    }
  }
  score = score * sum;

  scenicSumMatrix.set(index, score);
})

var partTwoMax = 0;
scenicSumMatrix.forEach(function (value) {
  if (value > partTwoMax) {
    partTwoMax = value;
  }
})

console.log("Part Two Highest Scenic Score: " + partTwoMax);