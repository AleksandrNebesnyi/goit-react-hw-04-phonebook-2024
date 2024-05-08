import { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

export const ContactForm = ({ submit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = e => {
    const inputName = e.currentTarget.name;
    switch (inputName) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit({ name, number });
    resetForm();
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div class="col-md-11">
        <input
          id={nameInputId}
          class="form-control form-control-lg  mb-4 "
          type="text"
          placeholder=" Enter Name"
          aria-label=".form-control-lg example"
          name="name"
          value={name}
          required
          onChange={handleChange}
        ></input>
      </div>
      <div class="col-md-11">
        <input
          id={numberInputId}
          class="form-control form-control-lg  mb-4 "
          type="tel"
          placeholder=" Enter Phone"
          aria-label=".form-control-lg example"
          name="number"
          value={number}
          required
          onChange={handleChange}
        ></input>
      </div>
      <button type="submit" class="btn btn-primary btn-lg">
        addContact
      </button>
    </form>
  );
};
