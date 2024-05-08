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
      {/* <button type="submit" className={css.button}>
        addContact
      </button> */}
    </form>
  );
};

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   nameInputId = nanoid();
//   numberInputId = nanoid();
//   handleChange = e => {
//     this.setState({ [e.currentTarget.name]: e.currentTarget.value });
//   };
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.submit(this.state);
//     this.resetForm();
//   };
//   resetForm = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };
//   render() {
//     return (
//       <form className={css.form} onSubmit={this.handleSubmit}>
//         <label htmlFor=" nameInputId">
//           <input
//             id=" nameInputId"
//             className={css.input}
//             onChange={this.handleChange}
//             type="text"
//             name="name"
//             value={this.state.name}
//             required
//             placeholder="Enter Name"
//             autoComplete="on"
//           />
//         </label>

//         <label htmlFor=" numberInputId">
//           <input
//             id=" numberInputId"
//             className={css.input}
//             onChange={this.handleChange}
//             type="tel"
//             name="number"
//             value={this.state.number}
//             required
//             placeholder="Enter Phone"
//             autoComplete="on"
//           />
//         </label>

//         <button type="submit" className={css.button}>
//           addContact
//         </button>
//       </form>
//     );
//   }
// }
