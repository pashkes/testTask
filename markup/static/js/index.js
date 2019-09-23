{
  const form = document.querySelector(`.js-connect-form`);
  const inputs = [...form.elements];
  const statusSent = document.querySelector(`.js-status-sent`);
  const submitButton = form.querySelector(`button`);

  const REGEX = {
    EMAIL: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    COUNTRY_CODE: /^\+[0-9]+$/,
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
      integer: true,
      minLength: 7,
    }
  };

  const errorMessages = {
    getMinLength: (name, value) => `${name} must have at least ${value} characters`,
    getRequired: (name) => `${name} is a required field`,
    getRightFormat: (value) => `Please enter a valid ${value}`,
    getOnlyNumbers: (value) => `${value} should be only digits`
  };

  const checkValidity = (value, schemaObject) => {
    const result = {};

    for (const item in schemaObject) {
      if (!schemaObject.hasOwnProperty(item)) continue;
      switch (item) {
        case `required`:
          result[item] = value.length > 0;
          break;
        case `minLength`:
          result[item] = value.length >= schemaObject.minLength;
          break;
        case `regex`:
          result[item] = schemaObject.regex.test(value);
          break;
        case `integer`:
          result[item] = Number(value) && typeof Number(value) === 'number';
          break;
      }
    }
    return result;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    const data = [...formData];
    const fieldsValidation = [];

    for (const field of data) {
      const [name, value] = field;
      const input = inputs.find(item => item.name === name);
      const error = input.nextElementSibling;
      const ruleValidation = schema[name];
      const validStatus = checkValidity(value, ruleValidation);

      const hasRequire = validStatus.hasOwnProperty('required');
      const hasMinLength = validStatus.hasOwnProperty('minLength');
      const hasRegex = validStatus.hasOwnProperty('regex');
      const hasInteger = validStatus.hasOwnProperty('integer');


      if (hasRequire && !validStatus.required) {
        error.textContent = errorMessages.getRequired(ruleValidation.name);
        error.classList.add(`show`);
      } else if (hasInteger && !validStatus.integer) {
        error.textContent = errorMessages.getOnlyNumbers(ruleValidation.name);
        error.classList.add(`show`);
      } else if (hasMinLength && !validStatus.minLength) {
        error.textContent = errorMessages.getMinLength(ruleValidation.name, ruleValidation.minLength);
        error.classList.add(`show`);
      } else if (hasRegex && !validStatus.regex) {
        error.textContent = errorMessages.getRightFormat(ruleValidation.name);
        error.classList.add(`show`);
      } else {
        error.textContent = ``;
        error.classList.remove(`show`);
      }
      fieldsValidation.push(...Object.values(validStatus));
    }
    const isFormValid = fieldsValidation.every(it => it);

    if (isFormValid) {
      submitButton.disabled = !submitButton.disabled;
      post(formData, onSuccessSent, onError);
    }
  };

  const onSuccessSent = ({message}) => {
    message === `success` ? setSuccessStatus() : setErrorStatus();
  };

  const onError = () => {
    submitButton.disabled = !submitButton.disabled;
    console.error(`Something went wrong`);
  };

  const setSuccessStatus = () => {
    inputs.forEach(it => it.value = ``);
    statusSent.textContent = `The form has been sent successfully, we will contact you`;
    statusSent.classList.add(`success`);
    statusSent.classList.remove(`error`);
    submitButton.disabled = false;
  };

  const setErrorStatus = () => {
    statusSent.textContent = `Something went wrong, the email did not pass the check`;
    statusSent.classList.remove(`success`);
    statusSent.classList.add(`error`);
    submitButton.disabled = false;
  };

  form && form.addEventListener(`submit`, handleSubmit);


  /* XHR Request */
  const STATUS_OK = 200;
  const TIME_WAIT = 10000;
  const URL = `./check-email.php`;
  const METHOD = {
    POST: `POST`,
  };

  const setup = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.timeout = TIME_WAIT;
    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_OK) {
        onSuccess(JSON.parse(xhr.response));
      } else {
        onError(`Unknown status: ${xhr.status}: ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', () => {
      onError('Connection failed');
    });

    xhr.addEventListener('timeout', () => {
      onError(`Request did not manage to fulfill for ${xhr.timeout}ms`);
    });
    return xhr;
  };

  const post = (body, onLoad, onError) => {
    const xhr = setup(onLoad, onError);
    xhr.open(METHOD.POST, URL);
    xhr.send(body);
  };

}
