'use strict';

(function (doc, slotCount, colorCount, codeLength) {
	function getSlot(slotIndex) {
		function getPiece(pieceIndex, slotIndex) {
			var piece = doc.createElement('div');
			piece.classList.add('piece');
			piece.dataset.pieceIndex = pieceIndex;
			piece.dataset.slotIndex = slotIndex;

			return piece;
		}

		var slot = doc.createElement('div');
		slot.classList.add('slot');

		for (var i = 0; i < codeLength; ++i) {
			slot.appendChild(getPiece(i, slotIndex));
		}

		return slot;
	}

	var slots = document.getElementById('slots');
	slots.innerHTML = '';
	for (var i = 0; i < slotCount; ++i) {
		slots.appendChild(getSlot(slotCount - i - 1));
	}

	//
	// Pegs
	// 

	function getPegs() {
		function getPeg() {
			var peg = document.createElement('div');
			peg.classList.add('peg');

			return peg;
		}

		var pegs = document.createElement('div');
		pegs.classList.add('pegs');

		for (var _i = 0; _i < codeLength; ++_i) {
			pegs.appendChild(getPeg());
		}

		return pegs;
	}

	var pegs = document.getElementById('pegs');
	pegs.innerHTML = '';
	for (var _i2 = 0; _i2 < slotCount; ++_i2) {
		pegs.appendChild(getPegs(_i2));
	}

	//
	// Inputs
	//

	function getInput(i) {
		var input = doc.createElement('div');
		input.classList.add('input');
		input.style.background = colorPalette[i];
		input.dataset.index = i;

		return input;
	}

	var inputs = document.getElementById('inputs');
	inputs.innerHTML = '';
	for (var _i3 = 0; _i3 < colorCount; ++_i3) {
		inputs.appendChild(getInput(_i3));
	}
})(document, slotCount, colorCount, codeLength);
//# sourceMappingURL=ui.js.map