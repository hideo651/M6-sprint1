import { number } from "yup";
import { ConflictError, BadRequestError } from "../helpers/Errors.helper";
import { ICreateContact } from "../interfaces/contact.interface";
import { contactRepository } from "../repositories/contact.repository";
import { userRepository } from "../repositories/user.repository";

export class ContactService {
  async create(payload: ICreateContact, userId: string) {
    const { cellphone, name, email } = payload;

    const foundUser = await userRepository.findOneBy({ id: userId });

    console.log(foundUser);

    const newContact = contactRepository.create({
      name,
      cellphone,
      email,
      user: { ...foundUser },
    });

    await contactRepository.save(newContact);
    return newContact;
  }

  async delete(contactId: string) {
    if (!contactId) {
      throw new BadRequestError("Informe o ID do contato");
    }

    try {
      const contacts = await contactRepository.findOneBy({ id: contactId });

      if (!contacts?.isActive) {
        throw new ConflictError("Contato inativo");
      }

      await contactRepository.update(contactId, { isActive: false });

      return 204;
    } catch (error) {
      throw new BadRequestError("ID inválido");
    }
  }

  async getUserContacts(userId: string) {
    const foundUser = await userRepository.findOneBy({ id: userId });

    const contacts = await contactRepository.find({
      where: { user: { id: foundUser!.id }, isActive: true },
      relations: { user: true },
    });

    return contacts;
  }
}
