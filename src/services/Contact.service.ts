import { number } from "yup";
import { ConflictError, BadRequestError } from "../helpers/Errors.helper";
import {
  IContactUpdate,
  ICreateContact,
} from "../interfaces/contact.interface";
import { contactRepository } from "../repositories/contact.repository";
import { userRepository } from "../repositories/user.repository";

export class ContactService {
  async create(payload: ICreateContact, userId: string) {
    const { cellphone, name, email } = payload;

    const foundUser = await userRepository.findOneBy({ id: userId });

    const contactEmail = await contactRepository.findOneBy({ email });

    if (contactEmail) {
      {
        throw new ConflictError("E-mail de contato já cadastrado");
      }
    }

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

    const contacts = await contactRepository.findOneBy({ id: contactId });
    console.log;

    if (!contacts?.isActive) {
      throw new ConflictError("Contato inativo");
    }

    await contactRepository.update(contactId, { isActive: false });

    return 204;
  }

  async getUserContacts(userId: string) {
    const foundUser = await userRepository.findOneBy({ id: userId });

    const contacts = await contactRepository.find({
      where: { user: { id: foundUser!.id }, isActive: true },
      relations: { user: true },
    });

    return contacts;
  }

  async update(payload: IContactUpdate, contactId: string) {
    const { cellphone, name, email } = payload;

    const contact = await contactRepository.findOneBy({ id: contactId });

    console.log("**************************");

    console.log(contact);

    const updateContact = contactRepository.create({
      ...contact,
      cellphone,
      email,
      name,
    });

    await contactRepository.save(updateContact);

    const contactResponse = { ...contact, ...updateContact };

    return contactResponse;
  }
}
