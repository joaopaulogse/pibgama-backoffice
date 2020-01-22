// import { formatFileSize, isDefinedGlobally } from 'node_modules/vee-validate/dist/locale/utils'

const messages = {
  _default: field => `${field} não é válido.`,
  after: (field, [target, inclusion]) =>
    `${field} deve ser posterior ${inclusion ? "ou igual " : ""}a ${target}.`,
  alpha: field => `${field} apenas deve conter letras.`,
  alpha_dash: field =>
    `${field} apenas deve conter letras, números e travessões.`,
  alpha_num: field => `${field} apenas deve conter letras e números.`,
  alpha_spaces: field => `${field} apenas deve conter letras e espaços.`,
  before: (field, [target, inclusion]) =>
    `${field} deve ser anterior ${inclusion ? "ou igual " : ""}a ${target}.`,
  between: (field, [min, max]) => `${field} deve estar entre ${min} e ${max}.`,
  confirmed: field => `${field} não coincide.`,
  credit_card: field => `${field} é inválido.`,
  date_between: (field, [min, max]) => `deve estar entre ${min} e ${max}.`,
  date_format: (field, [format]) => `deve ter um formato ${format}.`,
  decimal: (field, [decimals = "*"] = []) =>
    `${field} deve ser numérico e conter${
      decimals === "*" ? "" : " " + decimals
    } pontos decimais.`,
  digits: (field, [length]) =>
    `${field} deve ser numérico e conter exatamente ${length} dígitos.`,
  dimensions: (field, [width, height]) =>
    `${field} deve ser de ${width} píxeis por ${height} píxeis.`,
  email: field => `${field} deve ser um correio eletrónico válido.`,
  excluded: field => `${field} deve ser um valor válido.`,
  ext: field => `${field} deve ser um ficheiro válido.`,
  image: field => `${field} deve ser uma imagem.`,
  included: field => `${field} deve ser um valor válido.`,
  integer: field => `${field} deve ser um inteiro.`,
  ip: field => `${field} deve ser um endereço de ip válido.`,
  length: (field, [length, max]) => {
    if (max) {
      return `O tamanho do campo ${field} deve ser entre ${length} e ${max}.`;
    }

    return `O tamanho do campo ${field} deve ser ${length}.`;
  },
  max: (field, [length]) =>
    `${field} não deve ser maior que ${length} caracteres.`,
  max_value: (field, [max]) => `${field} deve ser ${max} ou menor.`,
  mimes: field => `${field} deve ser um tipo de ficheiro válido.`,
  min: (field, [length]) =>
    `${field} deve ter pelo menos ${length} caracteres.`,
  min_value: (field, [min]) => `${field} deve ser ${min} ou superior.`,
  numeric: field => `${field} deve conter apenas caracteres numéricos.`,
  regex: field => `O formato do campo ${field} não é válido.`,
  required: field => `${field} é obrigatório.`,
  // size: (field, [size]) => `${field} debe ser menor a ${formatFileSize(size)}.`,
  url: field => `${field} não é um URL válido.`,
  cpf: () => "CPF inválido"
};

const locale = {
  name: "pt",
  messages,
  attributes: {}
};

// if (isDefinedGlobally()) {
//   // eslint-disable-next-line
//   VeeValidate.Validator.localize({ [locale.name]: locale });
// }

export default locale;
