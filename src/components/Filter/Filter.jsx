import css from './Filter.module.css';

export const Filter = ({ onFilterChange, value }) => {
  return (
    <>
      <label className={css.label} htmlFor="inputFilterId">
        Search contact
        <input
          id="inputFilterId"
          className={css.input}
          type="text"
          name="filter"
          value={value}
          onChange={onFilterChange}
        />
      </label>
    </>
  );
};
