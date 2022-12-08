var fs = require("fs");
var input = fs.readFileSync("./puzzles/5/input.txt", "utf-8");
var inputSplit = input.split("\n");

function getCrate(from) {
    if (from == 1) {
       return stack1.shift();
    }
    if (from == 2) {
        return stack2.shift();
    }
    if (from == 3) {
        return stack3.shift();
    }
    if (from == 4) {
        return stack4.shift();
    }
    if (from == 5) {
        return stack5.shift();
    }
    if (from == 6) {
        return stack6.shift();
    }
    if (from == 7) {
        return stack7.shift();
    }
    if (from == 8) {
        return stack8.shift();
    }
    if (from == 9) {
        return stack9.shift();
    }
}

function loadCratePartOne(to, crate) {
    if (to == 1) {
        stack1.unshift(crate);
    }
    if (to == 2) {
        stack2.unshift(crate);
    }
    if (to == 3) {
        stack3.unshift(crate);
    }
    if (to == 4) {
        stack4.unshift(crate);
    }
    if (to == 5) {
        stack5.unshift(crate);
    }
    if (to == 6) {
        stack6.unshift(crate);
    }
    if (to == 7) {
        stack7.unshift(crate);
    }
    if (to == 8) {
        stack8.unshift(crate);
    }
    if (to == 9) {
        stack9.unshift(crate);
    }
}

function loadCratePartTwo(to) {
    if (to == 1) {
        stack.push(...stack1);
        stack1 = stack;
    }
    if (to == 2) {
        stack.push(...stack2);
        stack2 = stack;
    }
    if (to == 3) {
        stack.push(...stack3);
        stack3 = stack;
    }
    if (to == 4) {
        stack.push(...stack4);
        stack4 = stack;
    }
    if (to == 5) {
        stack.push(...stack5);
        stack5 = stack;
    }
    if (to == 6) {
        stack.push(...stack6);
        stack6 = stack;
    }
    if (to == 7) {
        stack.push(...stack7);
        stack7 = stack;
    }
    if (to == 8) {
        stack.push(...stack8);
        stack8 = stack;
    }
    if (to == 9) {
        stack.push(...stack9);
        stack9 = stack;
    }
}

// [G]                 [D] [R]        
// [W]         [V]     [C] [T] [M]    
// [L]         [P] [Z] [Q] [F] [V]    
// [J]         [S] [D] [J] [M] [T] [V]
// [B]     [M] [H] [L] [Z] [J] [B] [S]
// [R] [C] [T] [C] [T] [R] [D] [R] [D]
// [T] [W] [Z] [T] [P] [B] [B] [H] [P]
// [D] [S] [R] [D] [G] [F] [S] [L] [Q]
//  1   2   3   4   5   6   7   8   9 

var stack = [];
// Test
// var stack1 = ["N", "Z"];
// var stack2 = ["D", "C", "M"];
// var stack3 = ["P"];
// Real
var stack1 = ["G","W","L","J","B","R","T","D"];
var stack2 = ["C","W","S"];
var stack3 = ["M","T","Z","R"];
var stack4 = ["V","P","S","H","C","T","D"];
var stack5 = ["Z","D","L","T","P","G"];
var stack6 = ["D","C","Q","J","Z","R","B","F"];
var stack7 = ["R","T","F","M","J","D","B","S"];
var stack8 = ["M","V","T","B","R","H","L"];
var stack9 = ["V","S","D","P","Q"];
inputSplit.forEach(function(line) {
    var line = line.replace("\r", "").split(" ");
    var move = line[1];
    var from = line[3];
    var to = line[5];
    stack = [];
    for (var i = 0; i < move; i++) {
        var crate = getCrate(from);
        // loadCratePartOne(to, crate);
        stack.push(crate);
    }
    loadCratePartTwo(to);
});

// console.log("Part One Test: " + stack1[0], stack2[0], stack3[0]);
console.log("Part One: " + stack1[0], stack2[0], stack3[0], stack4[0], stack5[0], stack6[0], stack7[0], stack8[0], stack9[0]);