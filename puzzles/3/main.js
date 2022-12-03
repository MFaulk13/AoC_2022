var fs = require("fs");
var input = fs.readFileSync("./puzzles/3/input.txt", "utf-8");
var inputSplit = input.split("\n");

function getSharedItemOfGroup(elf1, elf2, elf3) {
    for (var i = 0; i < elf1.length; i++) {
        for (var j = 0; j < elf2.length; j++) {
            for (var k = 0; k < elf3.length; k++) {
                if (elf1.charAt(i) == elf2.charAt(j) && elf1.charAt(i) == elf3.charAt(k)) {
                    return elf1.charAt(i);
                }
            }
        }
    }
    return null;
}

function getSharedItem(compartment1, compartment2) {
    for (var i = 0; i < compartment1.length; i++) {
        for (var j = 0; j < compartment2.length; j++) {
            if (compartment1.charAt(i) == compartment2.charAt(j)) {
                return compartment1.charAt(i);
            }
        }
    }
    return null;
}

function getPriority(item) {
    var types = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 1; i < types.length+1; i++) {
        if (types.charAt(i-1) == item.toLowerCase()) {
            return item == item.toLowerCase() ? i : i + 26;
        }
    }
}

var prioritiesSum = 0;
var prioritiesGroupSum = 0;
var group = [];
inputSplit.forEach(function(line) {
    var line = line.replace("\r", "");
    var lineMiddel = line.length/2;
    var compartment1 = line.substring(0, lineMiddel);
    var compartment2 = line.substring(lineMiddel, line.length);

    var sharedItem = getSharedItem(compartment1, compartment2);
    var priority = getPriority(sharedItem);
    prioritiesSum = prioritiesSum + priority;

    // Part Two
    group.push(line);
    if (group.length == 3) {
        var sharedItemOfGroup = getSharedItemOfGroup(group[0], group[1], group[2]);
        var priorityGroup = getPriority(sharedItemOfGroup);
        prioritiesGroupSum = prioritiesGroupSum + priorityGroup;
        group = [];
    }
});

console.log("Part One sum of priorities: " + (prioritiesSum));
console.log("Part Two sum of group priorities: " + (prioritiesGroupSum));