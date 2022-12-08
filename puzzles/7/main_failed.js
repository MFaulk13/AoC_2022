var fs = require("fs");
var input = fs.readFileSync("./puzzles/7/input.txt", "utf-8");
var inputSplit = input.split("\n");

function hasNumber(myString) {
    return /\d/.test(myString);
}

function hasChar(myString) {
    var regExp = /[a-zA-Z]/g;
    return regExp.test(myString);
}

function getLast(line) {
    return line.split(" ").pop();
}

function setFileInDir(structure, dir, file) {
    if (typeof(structure) == "object") {
        for (let [key, value] of structure) {
            if (typeof(value) == "object" && key == dir) {
                value.set(file[1], Number(file[0]));
                return;
            }
            else setFileInDir(value, dir, file);
        }
    }
}

function setDirInDir(structure, dir, newDir) {
    if (typeof(structure) == "object") {
        for (let [key, value] of structure) {
            if (typeof(value) == "object" && key == dir) {
                try {
                    value.set(newDir, new Map());
                } catch (error) {
                    console.error(error);
                }
                return;
            }
            else setDirInDir(value, dir, newDir);
        }
    }
}

var preDir;
var found = false;
function getPreDir(structure, dir) {
    if (typeof(structure) == "object") {
        for (let [key, value] of structure) {
            if (typeof(value) == "object" && key == dir) {
                found = true;
            }
            else {
                preDir = key;
                getPreDir(value, dir);
            }
            if (found) {
                break;
            }
        }
    }
}

function setCurrentDir(line) {
    if (line.includes("/")) {
        currentDir = "";
    }
    else if (getLast(line) == "..") {
        // go one out
        found = false;
        getPreDir(structure, currentDir);
        currentDir = preDir;
    }
    else currentDir = getLast(line);
}

function setDir(line) {
    var dir = getLast(currentDir);
    if (dir == "") {
        structure.set(getLast(line), new Map());
    }
    else setDirInDir(structure, dir, getLast(line));
}

function setFile(line) {
    var file = line.split(" ");
    var dir = getLast(currentDir);
    if (dir == "") {
        structure.set(file[1], Number(file[0]));
    }
    else setFileInDir(structure, dir, file);
}

function generateStructure(line) {
    if (line.includes("$ cd")) {
        setCurrentDir(line);
    }
    if (line.includes("$ ls")) {
        // do nothing
    }
    if (line.includes("dir")) {
        setDir(line);
    }
    if (hasNumber(line)) {
        setFile(line);
    }
}

function getSumOfDir(structure) {
    if (typeof(structure) == "object") {
        for (let [key, value] of structure) {
            if (typeof(value) == "number") {
                sum = sum + value;
                // console.log("File: " + key + " value: " + value);
            }
            else getSumOfDir(value);
        }
    }
}

function getAllDir(structure) {
    if (typeof(structure) == "object") {
        for (let [key, value] of structure) {
            if (typeof(value) == "object") {
                allDir.push(key);
            }
            getAllDir(value);
        }
    }
}

function getDir(structure, dir) {
    if (typeof(structure) == "object") {
        for (let [key, value] of structure) {
            if (typeof(value) == "object" && key == dir) {
                dirMap = value;
            }
            getDir(value, dir);
        }
    }
}

var structure = new Map();
var currentDir = "";
inputSplit.forEach(function(line) {
    var line = line.replace("\r", "");
    //Generate folder structure
    generateStructure(line)
});

//Get all directories
var allDir = [];
getAllDir(structure);
console.log("All dir: " + allDir);

//Get sum of directories less or equal to 100000 
var partOneSum = 0;
var sum = 0;
var dirMap;
allDir.forEach(function(dir) {
    sum = 0;
    dirMap = new Map();
    getDir(structure, dir);
    getSumOfDir(dirMap);
    console.log("Dir: " + dir + " Sum: " + sum);
    if (sum <= 100000) {
        partOneSum = partOneSum + sum;
    }
});

console.log("Part One Sum: " + partOneSum);