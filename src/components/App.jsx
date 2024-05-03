import { useState, useMemo, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';
import initialContacts from '../contacts';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';

export const App = () => {
  const CONTACT_STORAGE_KEY = 'contacts';
  // Используем ленивую инициализацию для получения данных из localStorage.
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem(CONTACT_STORAGE_KEY)) ??
      initialContacts
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
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
  const deleteContact = id => {
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

  const changeFilter = e => {
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

// export class App extends Component {
//   state = {
//     contacts: initialContacts,
//     filter: '',
//   };

//   CONTACT_STORAGE_KEY = 'contacts';

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem(this.CONTACT_STORAGE_KEY));
//     if (contacts) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem(
//         this.CONTACT_STORAGE_KEY,
//         JSON.stringify(this.state.contacts)
//       );
//     }
//   }

//   addContact = ({ name, number }) => {
//     const normalizeName = name.toLowerCase();
//     if (normalizeName.trim() === '') {
//       return;
//     }
//     const ifNameAlreadyExist = this.state.contacts.some(
//       contact => contact.name.toLowerCase() === normalizeName
//     );

//     if (ifNameAlreadyExist) {
//       Notiflix.Notify.failure(`${name} is alredy in contact`);
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     this.setState(({ contacts }) => {
//       return {
//         contacts: [newContact, ...contacts],
//       };
//     });
//   };
//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizeFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   handleChange = e => {
//     this.setState({ [e.currentTarget.name]: e.currentTarget.value });
//   };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
//       <div className={css.container}>
//         <h1>Phonebook</h1>

//         <ContactForm submit={this.addContact} />

//         <h2>Contacts</h2>

//         <Filter onFilterChange={this.handleChange} value={filter} />
//         <ContactsList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
