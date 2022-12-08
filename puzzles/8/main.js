var fs = require("fs");
var input = fs.readFileSync("./puzzles/8/input_test.txt", "utf-8");
var inputSplit = input.split("\n");

const math = require('mathjs');
const matrix = math.matrix([]);
inputSplit.forEach(function (line, i) {
  var line = line.replace("\r", "");
  var digits = line.toString().split('');
  var row = digits.map(Number)
  row.forEach(function (value, j) {
    matrix.set([i, j], value);
  });
});

const identityMatrix = math.matrix([]);
function setIdentityMatrix(value, index, matrix, alter) {
  for (var i = 0; i < alter.reduce((a, b) => a + b, 0); i++) {
    try {
      var treeBesides = matrix.get(index.map(function(v,j) { return (v - alter[j]); }));
      if (treeBesides < value) {
        identityMatrix.set(index, 1);
      } else {
        identityMatrix.set(index, 0);
        break;
      }
    } catch (error) {
      identityMatrix.set(index, 1);
      break;
    }
  }
};

matrix.forEach(function (value, index, matrix) {
  var size = matrix.size();
  var alterMatrix = [[0,size[1]], [size[0],0], [0,-size[1]], [-size[0],0]];
  for (const alter of alterMatrix) {
    setIdentityMatrix(value, index, matrix, alter);
    if (identityMatrix.get(index) > 0) {
      break;
    }
  };
});
console.log(matrix);