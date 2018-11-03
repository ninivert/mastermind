(function(window, document) {
	const getPegs = (code, guess) => {
		let codecopy = code.slice();
		let blackPegs = 0, whitePegs = 0

		// Need to loop backwards because we are removing elements
		console.clear()
		console.log('BLACK TILES\n')
		console.log('guess=', guess, 'code=', codecopy)
		for (let i = codecopy.length-1; i >= 0; --i) {
			console.log('\ti=', i, 'guess[i]=', guess[i], 'code[i]=', codecopy[i])
			if (codecopy[i] === guess[i]) {
				++blackPegs
				// Remove color from code so it will not be checked again
				codecopy.splice(i, 1)
				console.log('\tREMOVING ', guess[i], 'at i=', i, '\n code is now ', codecopy)
			}
		}

		console.log('WHITE PEGS\n')
		console.log('guess=', guess, 'code=', codecopy)
		for (let i = codecopy.length-1; i >= 0; --i) {
			const index = codecopy.indexOf(guess[i])
			console.log('\ti=', i, 'guess[i]=', guess[i], 'code[i]=', codecopy[i], 'index=', index)
			if (index !== -1) {
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