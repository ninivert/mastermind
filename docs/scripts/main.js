'use strict';

//
// When a user clicks the board, select the piece if possible
//

document.getElementById('board').addEventListener('click', function (ev) {
	if (ev.target.classList.contains('piece')) {
		if (parseInt(ev.target.dataset.slotIndex) === selectedSlotIndex) {
			selectedPieceIndex = parseInt(ev.target.dataset.pieceIndex);
			activatePiece(selectedSlotIndex, selectedPieceIndex);
		}
	}
});

//
// Manage color input by user
//

document.getElementById('inputs').addEventListener('click', function (ev) {
	var index = parseInt(ev.target.dataset.index);
	var color = colorPalette[index];
	guess[selectedPieceIndex] = index;
	board[selectedSlotIndex][selectedPieceIndex].style.background = color;
	selectedPieceIndex = (selectedPieceIndex + 1) % codeLength;
	activatePiece(selectedSlotIndex, selectedPieceIndex);
});

//
// Submit, main game logic
//

document.getElementById('submit').addEventListener('click', function (ev) {
	// Check if the user completed all the spots
	if (guess.indexOf(null) === -1) {
		var pegCount = getPegs(code, guess);
		console.log(pegCount);
		for (var i = 0; i < codeLength; ++i) {
			if (i < pegCount.black) {
				activatePeg(selectedSlotIndex, i, 'black');
			} else if (i < pegCount.black + pegCount.white) {
				activatePeg(selectedSlotIndex, i, 'white');
			}
		}

		// Win ?
		if (pegCount.black === codeLength) {
			end(true);
			console.log('WIIIIIIN');
		}

		// Try again ?	
		else if (selectedSlotIndex < slotCount - 1) {
				// Reset guess
				guess.fill(null);
				++selectedSlotIndex;
				selectedPieceIndex = 0;
				activatePiece(selectedSlotIndex, selectedPieceIndex);
			}

			// Lose ?
			else {
					end(false);
					console.log('LOOOOOOOOOOOOSE');
				}
	}
});

//
// Utility
//

function activatePeg(j, i, type) {
	setTimeout(function (j, i) {
		pegs[j][i].classList.add(type);
	}.bind(undefined, j, i, type), i * 100);
}

function activatePiece(j, i) {
	// Deselect all the pieces
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = board[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var slot = _step.value;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = slot[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var piece = _step2.value;

					piece.classList.remove('active');
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	board[j][i].classList.add('active');
}

//
// Start/end game
//

var slotCount = void 0,
    codeLength = void 0,
    codeComplexity = void 0,
    augmentedContrast = void 0;
var colorPalette = void 0;
var selectedSlotIndex = void 0,
    selectedPieceIndex = void 0;
var guess = void 0,
    code = void 0;
var board = void 0,
    pegs = void 0;

//
// Init function, called once
//

function init() {
	// Constants
	slotCount = 6;
	codeComplexity = 6;
	codeLength = 4;
	augmentedContrast = false;

	CONTROLS.init();
}

//
// Manage game endings
//

function end() {
	// Display the code
	var codepieces = document.getElementsByClassName('code_piece');
	for (var i = 0; i < codepieces.length; ++i) {
		setTimeout(function (piece, color) {
			piece.classList.add('active');
			piece.style.background = color;
		}.bind(undefined, codepieces[i], colorPalette[code[i]]), i * 400);
	}
}

//
// Reset the game after end
//

function reset() {
	// Generate color palette
	colorPalette = new Array(codeComplexity).fill().map(function (_, i) {
		return 'hsl(' + Math.floor(i / codeComplexity * 360) + ', 90%, 60%)';
	});

	// User slot tracker
	selectedSlotIndex = 0;
	selectedPieceIndex = 0;

	// Code generation
	guess = new Array(codeLength).fill(null);
	code = new Array(codeLength).fill(null).map(function () {
		return Math.floor(Math.random() * codeComplexity);
	});
	console.log(code);

	// Reset the UI
	initUI(codeLength, codeComplexity, slotCount, colorPalette);

	// DOM objects
	board = new Array(slotCount).fill().map(function (_, i) {
		var slot = document.getElementsByClassName('slot')[slotCount - 1 - i];
		return slot.getElementsByClassName('piece');
	});

	pegs = new Array(slotCount).fill().map(function (_, i) {
		var pegz = document.getElementsByClassName('pegs')[slotCount - 1 - i];
		return pegz.getElementsByClassName('peg');
	});

	activatePiece(selectedSlotIndex, selectedPieceIndex);
}

window.onload = function () {
	init();
	reset();
};
//# sourceMappingURL=main.js.map