"use strict";

var slotCount = 6;
var colorCount = 6;
var codeLength = 4;

var colorPalette = new Array(colorCount).fill().map(function (_, i) {
	return "hsl(" + Math.floor(i / colorCount * 360) + ", 90%, 60%)";
});
//# sourceMappingURL=constants.js.map