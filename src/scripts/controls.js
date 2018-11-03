(function (window, document) {
	let selectedSlotIndex = 0
	let selectedPieceIndex = 0

	let guess = new Array(codeLength).fill(null)
	const code = new Array(codeLength).fill(null).map(() => Math.floor(Math.random() * colorCount))
	console.log(code)

	const board = new Array(slotCount).fill().map((_, i) => {
		const slot = document.getElementsByClassName('slot')[slotCount-1-i]
		return slot.getElementsByClassName('piece')
	})

	const pegs = new Array(slotCount).fill().map((_, i) => {
		const pegz = document.getElementsByClassName('pegs')[slotCount-1-i]
		return pegz.getElementsByClassName('peg')
	})


	document.getElementById('board').addEventListener('click', function(ev) {
		if (ev.target.classList.contains('piece')) {
			if (parseInt(ev.target.dataset.slotIndex) === selectedSlotIndex) {
				selectedPieceIndex = parseInt(ev.target.dataset.pieceIndex)
				activate(board[selectedSlotIndex][selectedPieceIndex])
			}
		}
	})


	document.getElementById('inputs').addEventListener('click', function(ev) {
		const index = parseInt(ev.target.dataset.index)
		const color = colorPalette[index]
		guess[selectedPieceIndex] = index
		board[selectedSlotIndex][selectedPieceIndex].style.background = color
		selectedPieceIndex = (selectedPieceIndex+1) % codeLength
		activate(board[selectedSlotIndex][selectedPieceIndex])
	})


	document.getElementById('submit').addEventListener('click', function(ev) {
		// Check if the user completed all the spots
		if (guess.indexOf(null) === -1) {
			const pegCount = getPegs(code, guess)
			console.log(pegCount)
			for (let i=0; i<codeLength; ++i) {
				if (i < pegCount.black) {
					setTimeout((function(j, i) {
						pegs[j][i].classList.add('black')
					}).bind(undefined, selectedSlotIndex, i), i*400)
				} else if (i < pegCount.black + pegCount.white) {
					setTimeout((function(j, i) {
						pegs[j][i].classList.add('white')
					}).bind(undefined, selectedSlotIndex, i), i*400)
				}
			}

			// Win ?
			if (pegCount.black === codeLength) {
				console.log('WIIIIIIN')
			}
			
			// Try again ?	
			else if (selectedSlotIndex < slotCount-1) {
				// Reset guess
				guess.fill(null)
				++selectedSlotIndex
				selectedPieceIndex = 0
				activate(board[selectedSlotIndex][selectedPieceIndex])
			}

			// Lose ?
			else {
				console.log('LOOOOOOOOOOOOSE')
			}
		}
	})


	function activate(target) {
		// Deselect all the pieces
		for (let slot of board) {
			for (let piece of slot) {
				piece.classList.remove('active')
			}
		}
		
		target.classList.add('active')
	}


	activate(board[selectedSlotIndex][selectedPieceIndex])
})(window, document)
