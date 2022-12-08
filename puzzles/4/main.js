var fs = require("fs");
var input = fs.readFileSync("./puzzles/4/input.txt", "utf-8");
var inputSplit = input.split("\n");

function getSections(range) {
    var ids = range.split("-");
    var missing = ids[1]-ids[0]-1;
    var sections = [];
    sections.push(ids[0]);
    for (var i = 1; i < missing+1; i++) {
        sections.push((Number(ids[0]) + i).toString());
    }
    sections.push(ids[1]);
    return sections;
}

function doesSectionContainOther(elfSections1, elfSections2) {
    for (var i = 0; i < elfSections1.length; i++) {
        if (!elfSections2.includes(elfSections1[i])) {
            return false;
        }
    }
    return true;
}

function doesSectionsOverlap(elfSections1, elfSections2) {
    for (var i = 0; i < elfSections1.length; i++) {
        if (elfSections2.includes(elfSections1[i])) {
            return true;
        }
    }
    return false;
}

var partOneSum = 0;
var partTwoSum = 0;
inputSplit.forEach(function(line) {
    var line = line.replace("\r", "");
    var elvesLine = line.split(",");
    var elf1 = elvesLine[0];
    var elf2 = elvesLine[1];

    var elfSections1 = getSections(elf1);
    var elfSections2 = getSections(elf2);

    if (doesSectionContainOther(elfSections1, elfSections2) || doesSectionContainOther(elfSections2, elfSections1)) {
        partOneSum++;
    }

    if (doesSectionsOverlap(elfSections1, elfSections2) || doesSectionsOverlap(elfSections2, elfSections1)) {
        partTwoSum++;
    }
});

console.log("Part One sum: " + (partOneSum));
console.log("Part Two sum: " + (partTwoSum));