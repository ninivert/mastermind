(function (doc, slotCount, colorCount, codeLength) {
	function getSlot(slotIndex) {
		function getPiece(pieceIndex, slotIndex) {
			const piece = doc.createElement('div')
			piece.classList.add('piece')
			piece.dataset.pieceIndex = pieceIndex
			piece.dataset.slotIndex = slotIndex

			return piece
		}

		const slot = doc.createElement('div')
		slot.classList.add('slot')

		for (let i=0; i<codeLength; ++i) {
			slot.appendChild(getPiece(i, slotIndex))
		}

		return slot
	}

	const slots = document.getElementById('slots')
	slots.innerHTML = ''
	for (let i=0; i<slotCount; ++i) {
		slots.appendChild(getSlot(slotCount-i-1))
	}

	//
	// Pegs
	// 

	function getPegs() {
		function getPeg() {
			const peg = document.createElement('div')
			peg.classList.add('peg')

			return peg
		}

		const pegs = document.createElement('div')
		pegs.classList.add('pegs')

		for (let i=0; i<codeLength; ++i) {
			pegs.appendChild(getPeg())
		}

		return pegs
	}

	const pegs = document.getElementById('pegs')
	pegs.innerHTML = ''
	for (let i=0; i<slotCount; ++i) {
		pegs.appendChild(getPegs(i))
	}

	//
	// Inputs
	//

	function getInput(i) {
		const input = doc.createElement('div')
		input.classList.add('input')
		input.style.background = colorPalette[i]
		input.dataset.index = i

		return input
	}

	const inputs = document.getElementById('inputs')
	inputs.innerHTML = ''
	for (let i=0; i<colorCount; ++i) {
		inputs.appendChild(getInput(i))
	}

})(document, slotCount, colorCount, codeLength)
