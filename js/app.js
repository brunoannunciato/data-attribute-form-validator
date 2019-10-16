'use strict'

const fields = document.querySelectorAll('input')
fields.forEach(field => {
	field.setAttribute('show-error', 0)
})

const throwError = event => {
	const element = event.target
	const errorElement = document.createElement('span')
	errorElement.classList.add('form-error')
	errorElement.innerHTML = element.getAttribute('data-error')


	if (element.getAttribute('data-error') && !element.value) {
		element.setAttribute('show-error', parseInt(element.getAttribute('show-error')) + 1)
	} else {
		const error = element.parentNode.querySelectorAll('.form-error');
		element.setAttribute('show-error', 0)
		error[0] && error[0].remove()
	}

	element.getAttribute('show-error') == 1 && element.parentElement.appendChild(errorElement)
}

const validateField = () => {
	fields.forEach( field => {
		field.addEventListener('blur', event => {
			throwError(event)
		})
	})
}

validateField()