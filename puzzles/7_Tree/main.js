class TreeNode {
    constructor(key, value = key, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.children = [];
    }
  
    get isLeaf() {
      return this.children.length === 0;
    }
  
    get hasChildren() {
      return !this.isLeaf;
    }
}
  
class Tree {
    constructor(key, value = key) {
      this.root = new TreeNode(key, value);
    }
  
    *preOrderTraversal(node = this.root) {
      yield node;
      if (node.children.length) {
        for (let child of node.children) {
          yield* this.preOrderTraversal(child);
        }
      }
    }
  
    *postOrderTraversal(node = this.root) {
      if (node.children.length) {
        for (let child of node.children) {
          yield* this.postOrderTraversal(child);
        }
      }
      yield node;
    }
  
    insert(parentNodeKey, key, value = key) {
      for (let node of this.preOrderTraversal()) {
        if (node.key === parentNodeKey) {
          node.children.push(new TreeNode(key, value, node));
          return true;
        }
      }
      return false;
    }

    insertToParentNode(parentNode, key, value = key) {
      parentNode.children.push(new TreeNode(key, value, parentNode));
    }
  
    remove(key) {
      for (let node of this.preOrderTraversal()) {
        const filtered = node.children.filter(c => c.key !== key);
        if (filtered.length !== node.children.length) {
          node.children = filtered;
          return true;
        }
      }
      return false;
    }
  
    find(key) {
      for (let node of this.preOrderTraversal()) {
        if (node.key === key) return node;
      }
      return undefined;
    }
}







var fs = require("fs");
var input = fs.readFileSync("./puzzles/7_Tree/input.txt", "utf-8");
var inputSplit = input.split("\n");

function getLast(line) {
    return line.split(" ").pop();
}

function hasNumber(myString) {
    return /\d/.test(myString);
}

const tree = new Tree("/");
let currentDir;
inputSplit.forEach(function(line) {
    var line = line.replace("\r", "");

    // Generate tree
    if (line.includes("$ cd")) {
        if (line.includes("/")) {
            currentDir = tree.root;
        }
        else if (getLast(line) == "..") {
            // go one out
            if (currentDir.key != "/") {
                currentDir = currentDir.parent;
            }
        }
        else {
          currentDir = currentDir.children
                        .filter(function(o) { return o.key === getLast(line); })
                        [0];
        }
    }
    if (line.includes("$ ls")) {
        // do nothing
    }
    if (line.includes("dir")) {
        tree.insertToParentNode(currentDir, getLast(line));
    }
    if (hasNumber(line)) {
        var file = line.split(" ");
        tree.insertToParentNode(currentDir, file[1], Number(file[0]));
    }
});

function getAllDirs() {
    return [...tree.preOrderTraversal()]
            .filter(function(o) { return typeof(o.value) === "string"; });
}

function getSumOfDir(dir) {
    return [...tree.preOrderTraversal(dir)]
            .map(x => x.value)
            .filter(function(o) { return typeof(o) === "number"; })
            .reduce((a, b) => a + b, 0);
}

var allDirs = getAllDirs();
var partOneSum = 0;
allDirs.forEach(function(dir) {
    var sum = getSumOfDir(dir);
    console.log("Dir: " + dir.key + " Sum: " + sum);
    if (sum <= 100000) {
        partOneSum = partOneSum + sum;
    }
});
console.log("Part One Sum: " + partOneSum);

//////////// PART TWO ////////////////
console.log("\nPart Two");
var totalDiskSpace = 70000000;
console.log("Disk space available: " + totalDiskSpace);
var totalUsedSpace = getSumOfDir(tree.root);
console.log("Total used space: " + totalUsedSpace);
var totalUnusedSpace = totalDiskSpace - totalUsedSpace;
console.log("Total unused space: " + totalUnusedSpace);
var neededUnusedSpace = 30000000;
console.log("Needed unused space: " + neededUnusedSpace);
var totalMinimumSpaceDelete = neededUnusedSpace - totalUnusedSpace;
console.log("Minimum space needed to delete: " + totalMinimumSpaceDelete);

var smallestSizeNeeded = totalDiskSpace;
allDirs.forEach(function(dir) {
  var sum = getSumOfDir(dir);
  if (sum >= totalMinimumSpaceDelete && sum < smallestSizeNeeded) {
    smallestSizeNeeded = sum;
  }
});
console.log("Part Two - Smallest Dir to delete has size: " + smallestSizeNeeded);