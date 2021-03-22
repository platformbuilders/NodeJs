
class CustomMessage {

  public customPt() {
    let msgs = {
      "string.empty": `{#label} não pode ser campo vazio`,
      "string.min": `{#label} deve ter no mínimo {#limit} caractéres`,
      "string.max": `{#label} deve ter no máximo {#limit} caractéres`,
      "any.required": `{#label} é um campo obrigatório`,
      "string.email": `"{#label} deve ser um email válido`
    }
    return msgs;
  }


}

export default CustomMessage;
