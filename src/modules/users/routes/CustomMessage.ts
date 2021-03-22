
class CustomMessage {

  public customPt(field: String) {
    let msgs = {
      "string.base": `"${field}" deve ser do tipo 'texto'`,
      "string.empty": `"${field}" não pode ser campo vazio`,
      "string.min": `"${field}" deve ter no mínimo {#limit} caractéres`,
      "string.max": `"${field}" deve ter no máximo {#limit} caractéres`,
      "any.required": `"${field}" é um campo obrigatório`
    }
    return msgs;
  }


}

export default CustomMessage;
