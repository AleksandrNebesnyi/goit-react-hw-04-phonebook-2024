import React, { ChangeEvent } from 'react';
// Типизируем пропсы
interface IProps {
  onFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Filter = ({ onFilterChange, value }:IProps) => {
  return (
    <>
      <div className="col-md-6">
        <input
          id="inputFilterId"
          className="form-control form-control-lg  mb-4 "
          type="text"
          placeholder=" Search contact ..."
          aria-label=".form-control-lg example"
          name="filter"
          value={value}
          onChange={onFilterChange}
        ></input>
      </div>
    </>
  );
};
