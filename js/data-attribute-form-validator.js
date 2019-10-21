'use strict'

const fields = document.querySelectorAll('input')
fields.forEach(field => {
	field.setAttribute('show-error', 0)
})

const formErrors = {
	pushError: errorField => {
		const formName = errorField.closest('form').getAttribute('name');

		if (!formErrors[formName]) {
			formErrors[formName] = [];
		}
		
		formErrors[formName].push(errorField['name'])
	},
	removeError: errorField => {
		const formName = errorField.closest('form').getAttribute('name')

		for (let i = 0; i < formErrors[formName].length; i++) {
			
			if (formErrors[formName][i] == errorField.name) {
				formErrors[formName].splice(i, 1);
			}
		}
	}
}

const validateRequiredFields = event => {
	const element = event.target
	let errorAdded = element.getAttribute('data-error'),
		value = element.value,
		requiredAttr = element.getAttribute('required')


	if (errorAdded && !value && requiredAttr !== null) {
		handleError.throwError(event)
	} else {
		handleError.clearError(event)
	}
}

const validatePatterns = event => {
	const patterns = {
		phone: data => /^\(?[0-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4}$/.test(data),
		email: data => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data),
		cep: data => /^[0-9]{5}-?[0-9]{3}$/.test(data)
	}
	const element = event.target

	if (element.value.length > 0 && patterns[element.getAttribute('data-validation')]) {
		patterns[element.getAttribute('data-validation')](element.value) ?
		handleError.clearError(event) :
		handleError.throwError(event)
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

		formErrors.pushError(element)

	},
	clearError: event => {
		const element = event.target
		const error = element.parentNode.querySelectorAll('.form-error')
		
		element.setAttribute('show-error', 0)
		error[0] && error[0].remove()

		formErrors.removeError(element)
	}
}

const validateField = () => {
	fields.forEach( field => {
		field.addEventListener('blur', event => {
			validateRequiredFields(event)
			validatePatterns(event)
		})
	})
}

validateField()