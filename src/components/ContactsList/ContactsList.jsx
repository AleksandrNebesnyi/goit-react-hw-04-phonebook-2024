import css from './ContactsList.module.css';
import { ContactItem } from '../ContactItem/ContactItem';

export const ContactsList = ({ contacts, onDeleteContact }) => {
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
