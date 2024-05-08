import css from './ContactItem.module.css';
// Интерфейс для пропсов
interface IProps {
  id: string;
  name: string;
  number: string;
  deleteContact: (id: string) => void;
};

export const ContactItem = ({ id, name, number, deleteContact }: IProps) => {
  return (
    <li className={css.listItem}>
      <p className={css.itemText}>
        {name}:{number}
      </p>

      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => deleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};
