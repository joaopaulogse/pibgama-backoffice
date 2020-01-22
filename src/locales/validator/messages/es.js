// import { formatFileSize, isDefinedGlobally } from 'node_modules/vee-validate/dist/locale/utils'

const messages = {
  _default: field => `${field} no es válido.`,
  after: (field, [target, inclusion]) =>
    `${field} debe ser posterior ${inclusion ? "o igual " : ""}a ${target}.`,
  alpha: field => `${field} solo debe contener letras.`,
  alpha_dash: field => `${field} solo debe contener letras, números y guiones.`,
  alpha_num: field => `${field} solo debe contener letras y números.`,
  alpha_spaces: field => `${field} solo debe contener letras y espacios.`,
  before: (field, [target, inclusion]) =>
    `${field} debe ser anterior ${inclusion ? "o igual " : ""}a ${target}.`,
  between: (field, [min, max]) => `${field} debe estar entre ${min} y ${max}.`,
  confirmed: field => `${field} no coincide.`,
  credit_card: field => `${field} es inválido.`,
  date_between: (field, [min, max]) => `debe estar entre ${min} y ${max}.`,
  date_format: (field, [format]) => `debe tener un formato ${format}.`,
  decimal: (field, [decimals = "*"] = []) =>
    `${field} debe ser numérico y contener${
      decimals === "*" ? "" : " " + decimals
    } puntos decimales.`,
  digits: (field, [length]) =>
    `${field} debe ser numérico y contener exactamente ${length} dígitos.`,
  dimensions: (field, [width, height]) =>
    `${field} debe ser de ${width} píxeles por ${height} píxeles.`,
  email: field => `${field} debe ser un correo electrónico válido.`,
  excluded: field => `${field} debe ser un valor válido.`,
  ext: field => `${field} debe ser un archivo válido.`,
  image: field => `${field} debe ser una imagen.`,
  included: field => `${field} debe ser un valor válido.`,
  integer: field => `${field} debe ser un entero.`,
  ip: field => `${field} debe ser una dirección ip válida.`,
  length: (field, [length, max]) => {
    if (max) {
      return `El largo del campo ${field} debe estar entre ${length} y ${max}.`;
    }

    return `El largo del campo ${field} debe ser ${length}.`;
  },
  max: (field, [length]) =>
    `${field} no debe ser mayor a ${length} caracteres.`,
  max_value: (field, [max]) => `${field} debe de ser ${max} o menor.`,
  mimes: field => `${field} debe ser un tipo de archivo válido.`,
  min: (field, [length]) =>
    `${field} debe tener al menos ${length} caracteres.`,
  min_value: (field, [min]) => `${field} debe ser ${min} o superior.`,
  numeric: field => `${field} debe contener solo caracteres numéricos.`,
  regex: field => `El formato del campo ${field} no es válido.`,
  required: field => `${field} es obligatorio.`,
  // size: (field, [size]) => `${field} debe ser menor a ${formatFileSize(size)}.`,
  url: field => `${field} no es una URL válida.`
};

const locale = {
  name: "es",
  messages,
  attributes: {}
};

// if (isDefinedGlobally()) {
//   // eslint-disable-next-line
//   VeeValidate.Validator.localize({ [locale.name]: locale });
// }

export default locale;
