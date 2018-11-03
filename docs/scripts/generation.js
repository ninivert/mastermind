'use strict';

(function () {
	function init(codeLength, codeComplexity, slotCount, colorPalette) {
		//
		// Code slot
		//

		function getCodePiece() {
			var piece = document.createElement('div');
			piece.classList.add('code_piece');

			return piece;
		}

		var codeslot = document.getElementById('code_slot');
		codeslot.innerHTML = '';
		for (var i = 0; i < codeLength; ++i) {
			codeslot.appendChild(getCodePiece());
		}

		//
		// Slot
		//

		function getSlot(slotIndex) {
			function getPiece(pieceIndex, slotIndex) {
				var piece = document.createElement('div');
				piece.classList.add('piece');
				piece.dataset.pieceIndex = pieceIndex;
				piece.dataset.slotIndex = slotIndex;

				return piece;
			}

			var slot = document.createElement('div');
			slot.classList.add('slot');

			for (var _i = 0; _i < codeLength; ++_i) {
				slot.appendChild(getPiece(_i, slotIndex));
			}

			return slot;
		}

		var slots = document.getElementById('slots');
		slots.innerHTML = '';
		for (var _i2 = 0; _i2 < slotCount; ++_i2) {
			slots.appendChild(getSlot(slotCount - _i2 - 1));
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

			for (var _i3 = 0; _i3 < codeLength; ++_i3) {
				pegs.appendChild(getPeg());
			}

			return pegs;
		}

		var pegs = document.getElementById('pegs');
		pegs.innerHTML = '';
		for (var _i4 = 0; _i4 < slotCount; ++_i4) {
			pegs.appendChild(getPegs(_i4));
		}

		//
		// Inputs
		//

		function getInput(i) {
			var input = document.createElement('div');
			input.classList.add('input');
			input.style.background = colorPalette[i];
			input.dataset.index = i;

			return input;
		}

		var inputs = document.getElementById('inputs');
		inputs.innerHTML = '';
		for (var _i5 = 0; _i5 < codeComplexity; ++_i5) {
			inputs.appendChild(getInput(_i5));
		}
	}

	window.initUI = init;
})();
//# sourceMappingURL=generation.js.map