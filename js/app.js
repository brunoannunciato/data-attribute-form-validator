'use strict'

const fields = document.querySelectorAll('input')
fields.forEach(field => {
	field.setAttribute('show-error', 0)
})

const validateRequiredFields = event => {
	const element = event.target

	console.log(element.getAttribute('required'))

	if (element.getAttribute('data-error') && !element.value && element.getAttribute('required') !== null) {
		handleError.throwError(event)
	} else {
		handleError.clearError(event)
	}
}

const handleError = {
	throwError: event => {
		const element = event.target
		const errorElement = document.createElement('span')
		errorElement.classList.add('form-error')
		errorElement.innerHTML = element.getAttribute('data-error')
	
		element.setAttribute('show-error', parseInt(element.getAttribute('show-error')) + 1)
	
		element.getAttribute('show-error') == 1 && element.parentElement.appendChild(errorElement)
	},
	clearError: event => {
		const element = event.target
		const error = element.parentNode.querySelectorAll('.form-error')
			element.setAttribute('show-error', 0)
			error[0] && error[0].remove()
	}
}

const validateField = () => {
	fields.forEach( field => {
		field.addEventListener('blur', event => {
			validateRequiredFields(event)
		})
	})
}

validateField()