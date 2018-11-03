'use strict';

(function (window, document) {
	var selectedSlotIndex = 0;
	var selectedPieceIndex = 0;

	var guess = new Array(codeLength).fill(null);
	var code = new Array(codeLength).fill(null).map(function () {
		return Math.floor(Math.random() * colorCount);
	});
	console.log(code);

	var board = new Array(slotCount).fill().map(function (_, i) {
		var slot = document.getElementsByClassName('slot')[slotCount - 1 - i];
		return slot.getElementsByClassName('piece');
	});

	var pegs = new Array(slotCount).fill().map(function (_, i) {
		var pegz = document.getElementsByClassName('pegs')[slotCount - 1 - i];
		return pegz.getElementsByClassName('peg');
	});

	document.getElementById('board').addEventListener('click', function (ev) {
		if (ev.target.classList.contains('piece')) {
			if (parseInt(ev.target.dataset.slotIndex) === selectedSlotIndex) {
				selectedPieceIndex = parseInt(ev.target.dataset.pieceIndex);
				activate(board[selectedSlotIndex][selectedPieceIndex]);
			}
		}
	});

	document.getElementById('inputs').addEventListener('click', function (ev) {
		var index = parseInt(ev.target.dataset.index);
		var color = colorPalette[index];
		guess[selectedPieceIndex] = index;
		board[selectedSlotIndex][selectedPieceIndex].style.background = color;
		selectedPieceIndex = (selectedPieceIndex + 1) % codeLength;
		activate(board[selectedSlotIndex][selectedPieceIndex]);
	});

	document.getElementById('submit').addEventListener('click', function (ev) {
		// Check if the user completed all the spots
		if (guess.indexOf(null) === -1) {
			var pegCount = getPegs(code, guess);
			console.log(pegCount);
			for (var i = 0; i < codeLength; ++i) {
				if (i < pegCount.black) {
					setTimeout(function (j, i) {
						pegs[j][i].classList.add('black');
					}.bind(undefined, selectedSlotIndex, i), i * 400);
				} else if (i < pegCount.black + pegCount.white) {
					setTimeout(function (j, i) {
						pegs[j][i].classList.add('white');
					}.bind(undefined, selectedSlotIndex, i), i * 400);
				}
			}

			// Win ?
			if (pegCount.black === codeLength) {
				console.log('WIIIIIIN');
			}

			// Try again ?	
			else if (selectedSlotIndex < slotCount - 1) {
					// Reset guess
					guess.fill(null);
					++selectedSlotIndex;
					selectedPieceIndex = 0;
					activate(board[selectedSlotIndex][selectedPieceIndex]);
				}

				// Lose ?
				else {
						console.log('LOOOOOOOOOOOOSE');
					}
		}
	});

	function activate(target) {
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

		target.classList.add('active');
	}

	activate(board[selectedSlotIndex][selectedPieceIndex]);
})(window, document);
//# sourceMappingURL=controls.js.map