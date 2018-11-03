'use strict';

(function (window, document) {
	var getPegs = function getPegs(code, guess) {
		var codecopy = code.slice();
		var blackPegs = 0,
		    whitePegs = 0;

		// Need to loop backwards because we are removing elements
		console.clear();
		console.log('BLACK TILES\n');
		console.log('guess=', guess, 'code=', codecopy);
		for (var i = codecopy.length - 1; i >= 0; --i) {
			console.log('\ti=', i, 'guess[i]=', guess[i], 'code[i]=', codecopy[i]);
			if (codecopy[i] === guess[i]) {
				++blackPegs;
				// Remove color from code so it will not be checked again
				codecopy.splice(i, 1);
				console.log('\tREMOVING ', guess[i], 'at i=', i, '\n code is now ', codecopy);
			}
		}

		console.log('WHITE PEGS\n');
		console.log('guess=', guess, 'code=', codecopy);
		for (var _i = codecopy.length - 1; _i >= 0; --_i) {
			var index = codecopy.indexOf(guess[_i]);
			console.log('\ti=', _i, 'guess[i]=', guess[_i], 'code[i]=', codecopy[_i], 'index=', index);
			if (index !== -1) {
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
//# sourceMappingURL=pegs.js.map