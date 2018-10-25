// Settings
const codeLength = 4
const maxTries = 6
let tokens = maxTries
let pegLog = []

// Code generation
const pick = list => list[Math.floor(Math.random() * list.length)]
const charset = ['r', 'g', 'b', 'y', 'm', 'c']
const code = new Array(codeLength).fill().map(() => pick(charset))

// User code scoring
const getPegs = str => {
	let colors = str.split('')

	let blackPegs = 0, whitePegs = 0
	let goodIndexes = []
	colors.forEach((color, i) => {
		if (code[i] === color) {
			++blackPegs
			goodIndexes.push(i)
		}
	})
	colors.forEach((color, i) => {
		if (code.indexOf(color) !== -1 && goodIndexes.indexOf(code.indexOf(color)) === -1) {
			// IF code has color in it AND that color has not yet been awarded a black peg
			++whitePegs
		}
	})

	return {
		black: blackPegs,
		white: whitePegs
	}
}

// User input sanitization
const colorRegExp = new RegExp(`([^(${charset.join('')})])`, 'g')
const sanitize = str => str.replace(colorRegExp, '')
const isValid = str => sanitize(str).split('').length === 4

// Speech
const getTokenCountPhrase = () => tokens === 1 ? 'Last token !' : `You have ${new Array(tokens).fill('⨀').join('')} (${tokens}) tokens left`
const getWonPhrase = () => `You won on your ${maxTries-tokens+1 === 1 ? '1st' : maxTries-tokens+1 === 2 ? '2nd' : maxTries-tokens+1 === 3 ? '3rd' : `${maxTries-tokens+1}th`} try you magnificent twat`
const getLostPhrase = () => `The code was ${code.join(' ')}.\nYou are the most pathetic creature I have ever seen.\nGoodbye.`

// User interface
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: `Your guess (${charset.join('/')}): `
})

console.log(`Code is ${code}`)

console.log(getTokenCountPhrase())
rl.prompt()

rl.on('line', function(line) {
	if (isValid(line.trim())) {
		const pegs = getPegs(sanitize(line.trim()))

		// Win
		if (pegs.black === codeLength) {
			console.log(getWonPhrase())
			rl.close()
		}

		// Try again/lose
		else {
			const black = new Array(pegs.black).fill('⬛')
			const white = new Array(pegs.white).fill('⬜')
			const space = new Array(codeLength - pegs.black - pegs.white).fill('•')
			const pegString = black.concat(white.concat(space)).join('')
			pegLog.push([sanitize(line.trim()), pegString])
			console.log(pegLog.map(entry => `${entry[0]}: ${entry[1]}`).join('\n'))
			--tokens
			
			// Try again
			if (tokens > 0) {
				console.log('\n' + getTokenCountPhrase())
				rl.prompt()
			}

			// Lose
			else {
				console.log(getLostPhrase())
				rl.close()
			}
		}
	}

	else {
		console.log(`${line.trim()} is not valid modafuka`)
		rl.prompt()
	}
})