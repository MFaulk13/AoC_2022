var fs = require("fs");
var input = fs.readFileSync("./puzzles/6/input.txt", "utf-8");

function isUnique(str) {
    return new Set(str).size == str.length;
}

var marker = "";
for (var i = 1; i < input.length+1; i++) {
    marker = marker + input.charAt(i-1);
    if (marker.length == 4) {
        if (isUnique(marker)) {
            console.log("First start-of-packet marker: " + (i));
            break;
        }
        marker = marker.substring(1, 4);
    }
}

var messageMarker = "";
for (var i = 1; i < input.length+1; i++) {
    messageMarker = messageMarker + input.charAt(i-1);
    if (messageMarker.length == 14) {
        if (isUnique(messageMarker)) {
            console.log("First start-of-message marker: " + (i));
            break;
        }
        messageMarker = messageMarker.substring(1, 14);
    }
}