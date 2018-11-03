"use strict";

(function (window, document) {
	var getPegs = function getPegs(code, guess) {
		var codecopy = code.slice();
		var blackPegs = 0,
		    whitePegs = 0;

		// Need to loop backwards because we are removing elements
		for (var i = guess.length - 1; i >= 0; --i) {
			if (codecopy[i] === guess[i]) {
				++blackPegs;
				// Remove color from code so it will not be checked again
				codecopy.splice(i, 1);
			}
		}

		for (var _i = 0; _i < guess.length; ++_i) {
			if (codecopy.indexOf(guess[_i]) !== -1) {
				++whitePegs;
			}
		}

		return {
			black: blackPegs,
			white: whitePegs
		};
	};

	window.getPegs = getPegs;
})(window, document);
//# sourceMappingURL=logic.js.map