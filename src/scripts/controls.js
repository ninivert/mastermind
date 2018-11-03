/*
 * Note: Every form is for ONE option
 * the form ID should match the initalizer CONTROLS.init.{name}
 *and the oninput callback CONTROLS.callback.{name}
 */

function CONTROLS() {}

CONTROLS.DOM = {
	// All the container form elements
	'forms': {
		codeLength: document.getElementById('code_length'),
		codeComplexity: document.getElementById('code_complexity'),
		slotCount: document.getElementById('slot_count'),
		augmentedContrast: document.getElementById('augmented_contrast'),
		reset: document.getElementById('reset'),
	},
	// The child values, for reference
	'children': {
	}
}

//
// Initalization
//

CONTROLS.init = function() {
	// Note: Looping through all the individual initializers to call them all
	// Also add the callbacks and disable form submission

	let forms = Object.keys(this.init)

	for (let i=0; i<forms.length; i++) {
		this.init[forms[i]].call(this)
		this.DOM.forms[forms[i]].onchange = this.callback[forms[i]].bind(this)
		this.DOM.forms[forms[i]].onclick = this.callback[forms[i]].bind(this)
		// onchange is for the checkboxes on mobile touch devices
		this.DOM.forms[forms[i]].onchange = this.callback[forms[i]].bind(this)
		this.DOM.forms[forms[i]].onsubmit = function() { return false }
	}
}

CONTROLS.init.codeLength = function() {
	let input = document.createElement('input')
	input.type = 'range'
	input.id = 'code_length_input'
	input.min = 2
	input.max = 10
	input.step = 1
	input.value = codeLength
	
	let label = document.createElement('label')
	label.htmlFor = 'code_length_input'
	label.innerHTML = codeLength

	this.DOM.children.codeLength = input
	this.DOM.children.codeLengthLabel = label
	this.DOM.forms.codeLength.appendChild(input)
	this.DOM.forms.codeLength.appendChild(label)
}

CONTROLS.init.codeComplexity = function() {
	let input = document.createElement('input')
	input.type = 'range'
	input.id = 'code_complexity_input'
	input.min = 2
	input.max = 10
	input.step = 1
	input.value = codeComplexity
	
	let label = document.createElement('label')
	label.htmlFor = 'code_complexity_input'
	label.innerHTML = codeComplexity

	this.DOM.children.codeComplexity = input
	this.DOM.children.codeComplexityLabel = label
	this.DOM.forms.codeComplexity.appendChild(input)
	this.DOM.forms.codeComplexity.appendChild(label)
}

CONTROLS.init.slotCount = function() {
	let input = document.createElement('input')
	input.type = 'range'
	input.id = 'slot_count_input'
	input.min = 2
	input.max = 10
	input.step = 1
	input.value = slotCount
	
	let label = document.createElement('label')
	label.htmlFor = 'slot_count_input'
	label.innerHTML = slotCount

	this.DOM.children.slotCount = input
	this.DOM.children.slotCountLabel = label
	this.DOM.forms.slotCount.appendChild(input)
	this.DOM.forms.slotCount.appendChild(label)
}

CONTROLS.init.augmentedContrast = function() {
	let input = document.createElement('input')
	input.type = 'checkbox'
	input.id = 'augmented_contrast_input'
	input.checked = augmentedContrast
	
	let label = document.createElement('label')
	label.htmlFor = 'augmented_contrast_input'

	this.DOM.children.augmentedContrast = input
	this.DOM.children.augmentedContrastLabel = label
	this.DOM.forms.augmentedContrast.appendChild(input)
	this.DOM.forms.augmentedContrast.appendChild(label)
}

CONTROLS.init.reset = function() {
	let btn = document.createElement('input')
	btn.type = 'button'
	btn.value = 'Play another game'

	this.DOM.forms.reset.appendChild(btn)
}

//
// Callbacks
//

CONTROLS.callback = {}

CONTROLS.callback.codeLength = function() {
	let value = parseInt(this.DOM.children.codeLength.value)
	codeLength = value
	this.DOM.children.codeLengthLabel.innerHTML = value
	reset()
}

CONTROLS.callback.codeComplexity = function() {
	let value = parseInt(this.DOM.children.codeComplexity.value)
	codeComplexity = value
	this.DOM.children.codeComplexityLabel.innerHTML = value
	reset()
}

CONTROLS.callback.slotCount = function() {
	let value = parseInt(this.DOM.children.slotCount.value)
	slotCount = value
	this.DOM.children.slotCountLabel.innerHTML = value
	reset()
}

CONTROLS.callback.augmentedContrast = function() {
	augmentedContrast = this.DOM.children.augmentedContrast.checked
	reset()
}

CONTROLS.callback.reset = function() {
	reset()
}