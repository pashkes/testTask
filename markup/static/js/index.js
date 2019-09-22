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
      required: true,
      minLength: 3,
    },
    fullName: {
      required: true,
      minLength: 3,
    },
    email: {
      required: true,
      regex: REGEX.EMAIL,
    },
    phonePrefix: {
      required: true,
      regex: REGEX.COUNTRY_CODE,
    },
    phone: {
      required: true,
      regex: REGEX.ONLY_NUMBERS,
      minLength: 7,
    }
  };

  const errorMessages = {
    getMinLength: (name, value, type) => `${name} must have at least ${value} ${type}`,
    getRequired: (name) => `${name} is a required field`,
    getRightFormat: (value) => `Please enter a valid ${value}`,
  };

  const checkValidity = (value, schemaObject) => {
    const result = {};
    for (const item in schemaObject) {
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
    const data = new FormData(form);

    for (const field of data.entries()) {
      const [name, value] = field;
      const input = inputs.find(item => item.name === name);
      const validStatus = checkValidity(value, schema[name]);
      const error = input.nextElementSibling;

      if (validStatus.hasOwnProperty(`required`) && !validStatus.required) {
        error.textContent = errorMessages.getRequired(name);
      } else if (validStatus.hasOwnProperty(`minLength`) && !validStatus.minLength) {
        error.textContent = errorMessages.getMinLength(name, schema[name].minLength, `characters`);
      } else if (validStatus.hasOwnProperty(`regex`) && !validStatus.regex) {
        error.textContent = errorMessages.getRightFormat(name, `numbers`);
      } else {
        error.textContent = ``;
      }
    }
  };

  form && form.addEventListener(`submit`, handleSubmit);
}
