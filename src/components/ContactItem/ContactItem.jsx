import css from './ContactItem.module.css';

export const ContactItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={css.listItem}>
      <p className={css.itemText}>
        {name}:{number}
      </p>

      <button
        type="button"
        className={css.itemButton}
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};
