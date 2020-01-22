// import { formatFileSize, isDefinedGlobally } from 'node_modules/vee-validate/dist/locale/utils'

const messages = {
  _default: field => `${field} is not valid.`,
  after: (field, [target, inclusion]) =>
    `${field} must be after ${inclusion ? "or equal " : ""}to ${target}.`,
  alpha: field => `${field} must only contain letters.`,
  alpha_dash: field =>
    `${field} must only contain letters, numbers and hypens.`,
  alpha_num: field => `${field} must only contain letters and numbers.`,
  alpha_spaces: field => `${field} must only contain letters and spaces.`,
  before: (field, [target, inclusion]) =>
    `${field} must be before ${inclusion ? "or equal " : ""}to ${target}.`,
  between: (field, [min, max]) => `${field} must be between ${min} and ${max}.`,
  confirmed: field => `${field} does not match.`,
  credit_card: field => `${field} is invalid.`,
  date_between: (field, [min, max]) => `must be between ${min} and ${max}.`,
  date_format: (field, [format]) => `must have a format ${format}.`,
  decimal: (field, [decimals = "*"] = []) =>
    `${field} must be numerical and contain ${
      decimals === "*" ? "" : " " + decimals
    } decimals.`,
  digits: (field, [length]) =>
    `${field} must be numerical and contain exactly ${length} digits.`,
  dimensions: (field, [width, height]) =>
    `${field} must be ${width} pixels by ${height} pixels.`,
  email: field => `${field} must be a valid e-mail address.`,
  excluded: field => `${field} must be a valid value.`,
  ext: field => `${field} must be a valid file.`,
  image: field => `${field} must be a picture.`,
  included: field => `${field} must be a valid value.`,
  integer: field => `${field} must be a whole number.`,
  ip: field => `${field} must be a valid IP address.`,
  length: (field, [length, max]) => {
    if (max) {
      return `The length of the field ${field} must be between ${length} and ${max}.`;
    }

    return `The length of the field ${field} must be ${length}.`;
  },
  max: (field, [length]) =>
    `${field} must not be more than ${length} characters.`,
  max_value: (field, [max]) => `${field} must be ${max} or less.`,
  mimes: field => `${field} must be a valid file type.`,
  min: (field, [length]) => `${field} must have at least ${length} characters.`,
  min_value: (field, [min]) => `${field} must be ${min} or greater.`,
  numeric: field => `${field} must only contain numerical characters.`,
  regex: field => `The format of the field ${field} is not valid.`,
  required: field => `${field} is mandatory.`,
  // size: (field, [size]) => `${field} debe ser menor a ${formatFileSize(size)}.`,
  url: field => `${field} is not a valid URL.`
};

const locale = {
  name: "en",
  messages,
  attributes: {}
};

// if (isDefinedGlobally()) {
//   // eslint-disable-next-line
//   VeeValidate.Validator.localize({ [locale.name]: locale });
// }

export default locale;
