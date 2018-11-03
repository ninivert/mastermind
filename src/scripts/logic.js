(function(window, document) {
	const getPegs = (code, guess) => {
		let codecopy = code.slice();
		let blackPegs = 0, whitePegs = 0

		// Need to loop backwards because we are removing elements
		for (let i = guess.length-1; i >= 0; --i) {
			if (codecopy[i] === guess[i]) {
				++blackPegs
				// Remove color from code so it will not be checked again
				codecopy.splice(i, 1)
			}
		}

		for (let i = 0; i < guess.length; ++i) {	
			if (codecopy.indexOf(guess[i]) !== -1) {
				++whitePegs
			}
		}

		return {
			black: blackPegs,
			white: whitePegs
		}
	}

	window.getPegs = getPegs
})(window, document)