import * as yup from "yup";

export class ContactSchema {
  static create = yup.object().shape({
    email: yup.string().email().required("Email obrigatório"),
    cellphone: yup.string().required("Número de telefone obrigatório"),
    name: yup.string().required("Nome do contato obrigatório"),
  });
}
