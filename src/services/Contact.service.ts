import { ICreateContact } from "../interfaces/contact.interface";
import { contactRepository } from "../repositories/contact.repository";
import { userRepository } from "../repositories/user.repository";

export class ContactService {
  async create(payload: ICreateContact, userId: string) {
    const { cellphone, name, email } = payload;
    console.log(payload);
    console.log(userId);

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

  async getUserContacts(userId: string) {
    const foundUser = await userRepository.findOneBy({ id: userId });

    const contacts = await contactRepository.find({
      where: { user: { id: foundUser!.id } },
      relations: { user: true },
    });

    return contacts;
  }
}
