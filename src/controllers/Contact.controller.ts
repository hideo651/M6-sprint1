import { Response, Request } from "express";
import {
  IContactUpdate,
  ICreateContact,
} from "../interfaces/contact.interface";
import { ContactService } from "../services/Contact.service";

export class ContactController {
  async create(req: Request, res: Response) {
    const payload: ICreateContact = req.body;
    const { id } = req.user;
    const contact = await new ContactService().create(payload, id);
    return res.status(200).json(contact);
  }

  async delete(req: Request, res: Response) {
    const status = await new ContactService().delete(req.params.id);

    return res.sendStatus(status);
  }

  async getUserContacts(req: Request, res: Response) {
    const { id } = req.user;
    const contacts = await new ContactService().getUserContacts(id);

    return res.status(200).json(contacts);
  }

  async update(req: Request, res: Response) {
    const payload: IContactUpdate = req.body;
    const contactId: string = req.params.id;

    const data = await new ContactService().update(payload, contactId);

    return res.status(200).json(data);
  }
}
