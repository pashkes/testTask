{
  const form = document.querySelector(`.js-connect-form`);
  const inputs = [...form.elements];

  const REGEX = {
    EMAIL: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    COUNTRY_CODE: /^\+[0-9]+$/,
    ONLY_NUMBERS: /^[+]?\d*$/,
  };

  const schema = {
    firstName: {
      name: `First name`,
      required: true,
      minLength: 3,
    },
    lastName: {
      name: `Last name`,
      required: true,
      minLength: 3,
    },
    email: {
      name: `Email`,
      required: true,
      regex: REGEX.EMAIL,
    },
    phonePrefix: {
      name: `Country code`,
      required: true,
      regex: REGEX.COUNTRY_CODE,
    },
    phone: {
      name: `Phone`,
      required: true,
      regex: REGEX.ONLY_NUMBERS,
      minLength: 7,
    }
  };

  const errorMessages = {
    getMinLength: (name, value) => `${name} must have at least ${value} characters`,
    getRequired: (name) => `${name} is a required field`,
    getRightFormat: (value) => `Please enter a valid ${value}`,
  };

  const checkValidity = (value, schemaObject) => {
    const result = {};
    for (const item in schemaObject) {
      if(!schemaObject.hasOwnProperty(item)) continue;
      switch (item) {
        case `required`:
          result[item] = value.length > 0;
          break;
        case `minLength`:
          result[item] = value.length >= schemaObject.minLength;
          break;
        case `regex`:
          result[item] = schemaObject.regex.test(value);
      }
    }
    return result;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = [...new FormData(form)];

    for (const field of data) {
      const [name, value] = field;
      const input = inputs.find(item => item.name === name);
      const error = input.nextElementSibling;
      const ruleValidation = schema[name];
      const validStatus = checkValidity(value, ruleValidation);

      const hasRequire = validStatus.hasOwnProperty('required');
      const hasMinLength = validStatus.hasOwnProperty('minLength');
      const hasRegex = validStatus.hasOwnProperty('regex');

      if (hasRequire && !validStatus.required) {
        error.textContent = errorMessages.getRequired(ruleValidation.name);
        error.classList.add(`show`)
      } else if (hasMinLength && !validStatus.minLength) {
        error.textContent = errorMessages.getMinLength(ruleValidation.name, ruleValidation.minLength);
        error.classList.add(`show`)
      } else if (hasRegex && !validStatus.regex) {
        error.textContent = errorMessages.getRightFormat(ruleValidation.name);
        error.classList.add(`show`)
      } else {
        error.textContent = ``;
        error.classList.remove(`show`)
      }
    }

  };

  form && form.addEventListener(`submit`, handleSubmit);
}
