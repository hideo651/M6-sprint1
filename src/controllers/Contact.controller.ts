import { Response, Request } from "express";
import { ICreateContact } from "../interfaces/contact.interface";
import { ContactService } from "../services/Contact.service";

export class ContactController {
  async create(req: Request, res: Response) {
    const payload: ICreateContact = req.body;
    const { id } = req.user;
    const contact = await new ContactService().create(payload, id);
    return res.status(200).json(contact);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body;

    const status = await new ContactService().delete(id);

    return res.sendStatus(status);
  }

  async getUserContacts(req: Request, res: Response) {
    const { id } = req.user;
    const contacts = await new ContactService().getUserContacts(id);

    return res.status(200).json(contacts);
  }
}
