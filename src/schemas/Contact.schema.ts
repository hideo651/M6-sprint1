import * as yup from "yup";

export class ContactSchema {
  static create = yup.object().shape({
    email: yup.string().email().required("Email obrigatório"),
    cellphone: yup.string().required("Número de telefone obrigatório"),
    name: yup.string().required("Nome do contato obrigatório"),
  });

  static update = yup.object().shape({
    email: yup
      .string()
      .email("Campo email deve ser um email válido")
      .notRequired(),
    cellphone: yup.string().notRequired(),
    name: yup.string().notRequired(),
  });
}
