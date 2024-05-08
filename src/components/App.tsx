import { useState, useMemo, useEffect,ChangeEvent } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';
import initialContacts from '../contacts.json';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';

interface IContact {
  id: string;
  name: string;
  number: string;
}
interface INewContact {
  
  name: string;
  number: string;
}
export const App = () => {
  const CONTACT_STORAGE_KEY: string = 'contacts';
  // Используем ленивую инициализацию для получения данных из localStorage.

  // Тип для функции
type typeGetInitialContacts = () => IContact[];
  const getInitialContacts:typeGetInitialContacts= ()=>{
    const savedContacts=window.localStorage.getItem(CONTACT_STORAGE_KEY);
    return savedContacts ? JSON.parse(savedContacts) : initialContacts;
  }
  // const [contacts, setContacts] = useState<IContact[]>(() => {
  //   return (
  //     JSON.parse(window.localStorage.getItem(CONTACT_STORAGE_KEY)) ??
  //     initialContacts
  //   );
  // });
  const [contacts, setContacts] = useState<IContact[]>(getInitialContacts)
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }:INewContact) => {
    const normalizeName = name.toLowerCase();
    if (normalizeName.trim() === '') {
      return;
    }
    const ifNameAlreadyExist = contacts.some(
      contact => contact.name.toLowerCase() === normalizeName
    );

    if (ifNameAlreadyExist) {
      Notiflix.Notify.failure(`${name} is alredy in contact`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([newContact, ...contacts]);
  };
  const deleteContact = (id:string) => {
    console.log(id);
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  // useMemo(() => computeExpensiveValue(a, b), [a, b]);
  const visibleContacts = useMemo(() => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  }, [contacts, filter]);

  const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>

      <ContactForm submit={addContact} />

      <h2>Contacts</h2>

      <Filter onFilterChange={changeFilter} value={filter} />
      <ContactsList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
