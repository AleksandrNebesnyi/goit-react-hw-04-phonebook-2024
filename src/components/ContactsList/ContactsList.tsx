import css from './ContactsList.module.css';
import { ContactItem } from '../ContactItem/ContactItem';
interface IContact {
  id: string;
  name: string;
  number: string;
}
interface IProps {
  contacts: IContact[];
  onDeleteContact: (id: string) => void;
}

export const ContactsList = ({ contacts, onDeleteContact }:IProps) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};
