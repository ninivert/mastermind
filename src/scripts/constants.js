const slotCount = 6
const colorCount = 6
const codeLength = 4

const colorPalette = new Array(colorCount).fill().map((_, i) => {
	return `hsl(${Math.floor(i/colorCount*360)}, 90%, 60%)`
})