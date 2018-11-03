//
// When a user clicks the board, select the piece if possible
//

document.getElementById('board').addEventListener('click', function(ev) {
	if (ev.target.classList.contains('piece')) {
		if (parseInt(ev.target.dataset.slotIndex) === selectedSlotIndex) {
			selectedPieceIndex = parseInt(ev.target.dataset.pieceIndex)
			activatePiece(selectedSlotIndex, selectedPieceIndex)
		}
	}
})

//
// Manage color input by user
//

document.getElementById('inputs').addEventListener('click', function(ev) {
	const index = parseInt(ev.target.dataset.index)
	const color = colorPalette[index]
	guess[selectedPieceIndex] = index
	board[selectedSlotIndex][selectedPieceIndex].style.background = color
	selectedPieceIndex = (selectedPieceIndex+1) % codeLength
	activatePiece(selectedSlotIndex, selectedPieceIndex)
})

//
// Submit, main game logic
//

document.getElementById('submit').addEventListener('click', function(ev) {
	// Check if the user completed all the spots
	if (guess.indexOf(null) === -1) {
		const pegCount = getPegs(code, guess)
		console.log(pegCount)
		for (let i=0; i<codeLength; ++i) {
			if (i < pegCount.black) {
				activatePeg(selectedSlotIndex, i, 'black')
			} else if (i < pegCount.black + pegCount.white) {
				activatePeg(selectedSlotIndex, i, 'white')
			}
		}

		// Win ?
		if (pegCount.black === codeLength) {
			end(true)
			console.log('WIIIIIIN')
		}
		
		// Try again ?	
		else if (selectedSlotIndex < slotCount-1) {
			// Reset guess
			guess.fill(null)
			++selectedSlotIndex
			selectedPieceIndex = 0
			activatePiece(selectedSlotIndex, selectedPieceIndex)
		}

		// Lose ?
		else {
			end(false)
			console.log('LOOOOOOOOOOOOSE')
		}
	}
})

//
// Utility
//

function activatePeg(j, i, type) {
	setTimeout((function(j, i) {
		pegs[j][i].classList.add(type)
	}).bind(undefined, j, i, type), i*100)
}

function activatePiece(j, i) {
	// Deselect all the pieces
	for (let slot of board) {
		for (let piece of slot) {
			piece.classList.remove('active')
		}
	}
	
	board[j][i].classList.add('active')
}

//
// Start/end game
//

let slotCount, codeLength, codeComplexity, augmentedContrast
let colorPalette
let selectedSlotIndex, selectedPieceIndex
let guess, code
let board, pegs

//
// Init function, called once
//

function init() {
	// Constants
	slotCount = 6
	codeComplexity = 6
	codeLength = 4
	augmentedContrast = false

	CONTROLS.init()
}

//
// Manage game endings
//

function end() {
	// Display the code
	const codepieces = document.getElementsByClassName('code_piece')
	for (let i=0; i<codepieces.length; ++i) {
		setTimeout((function(piece, color) {
			piece.classList.add('active')
			piece.style.background = color
		}).bind(undefined, codepieces[i], colorPalette[code[i]]), i*400)
	}

	
}

//
// Reset the game after end
//

function reset() {
	// Generate color palette
	colorPalette = new Array(codeComplexity).fill().map((_, i) => {
		return `hsl(${Math.floor(i/codeComplexity*360)}, 90%, 60%)`
	})

	// User slot tracker
	selectedSlotIndex = 0
	selectedPieceIndex = 0

	// Code generation
	guess = new Array(codeLength).fill(null)
	code = new Array(codeLength).fill(null).map(() => Math.floor(Math.random() * codeComplexity))
	console.log(code)

	// Reset the UI
	initUI(codeLength, codeComplexity, slotCount, colorPalette)
	
	// DOM objects
	board = new Array(slotCount).fill().map((_, i) => {
		const slot = document.getElementsByClassName('slot')[slotCount-1-i]
		return slot.getElementsByClassName('piece')
	})

	pegs = new Array(slotCount).fill().map((_, i) => {
		const pegz = document.getElementsByClassName('pegs')[slotCount-1-i]
		return pegz.getElementsByClassName('peg')
	})

	activatePiece(selectedSlotIndex, selectedPieceIndex)
}

window.onload = function() {
	init()
	reset()
}