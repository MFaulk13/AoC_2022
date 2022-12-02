var fs = require("fs");
var input = fs.readFileSync("./puzzles/1/input.txt", "utf-8");
var inputByElf = input.split("\n\r");

var listOfElfCaloriesSum = [];
inputByElf.forEach(function(elf) {
    var elfCalories = elf.split("\n")
    var elfCaloriesSum = 0;
    elfCalories.forEach(function(calory) {
        elfCaloriesSum = elfCaloriesSum + Number(calory);
    })
    listOfElfCaloriesSum.push(elfCaloriesSum);
});

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

var listAltered = listOfElfCaloriesSum.slice();

var maxElf1 = listAltered.max();
console.log("1: Elf #" + (listOfElfCaloriesSum.indexOf(maxElf1)+1) + " calories: " + maxElf1);

listAltered.splice(listAltered.indexOf(maxElf1), 1);
var maxElf2 = listAltered.max();
console.log("2: Elf #" + (listOfElfCaloriesSum.indexOf(maxElf2)+1) + " calories: " + maxElf2);

listAltered.splice(listAltered.indexOf(maxElf2), 1);
var maxElf3 = listAltered.max();
console.log("3: Elf #" + (listOfElfCaloriesSum.indexOf(maxElf3)+1) + " calories: " + maxElf3);

console.log("Total: " + (maxElf1 + maxElf2 + maxElf3));