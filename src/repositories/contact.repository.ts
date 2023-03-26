import DataSource from "../data-source";
import Contact from "../entities/Contact.entity";

export const contactRepository = DataSource.getRepository(Contact);
