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

	let codecopy = code.slice();
	let blackPegs = 0, whitePegs = 0

	// Need to loop backwards because we are removing elements
	for (let i = colors.length-1; i >= 0; --i) {
		if (codecopy[i] === colors[i]) {
			++blackPegs
			// Remove color from code so it will not be checked again
			codecopy.splice(i, 1)
		}
	}

	for (let i = 0; i < colors.length; ++i) {	
		if (codecopy.indexOf(colors[i]) !== -1) {
			++whitePegs
		}
	}

	return {
		black: blackPegs,
		white: whitePegs
	}
}

// User input sanitization
const colorRegExp = new RegExp(`([^(${charset.join('')})])`, 'gi')
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

// console.log(`Code is ${code}`)

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