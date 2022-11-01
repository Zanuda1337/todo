import classes from 'src/features/TodoList/TodoList.module.scss';
import clsx from 'clsx';
import React from 'react';
import { TFilterOptions } from 'src/features/TodoList/TodoList.types';

type TFilterProps = {
  itemsLeftText: string;
  filterBy: TFilterOptions;
  options: TFilterOptions[];
  onChange: (option: TFilterOptions) => void;
  onClearCompleted: () => void;
};

const Filter: React.FC<TFilterProps> = ({
  options,
  filterBy,
  itemsLeftText,
  onChange,
  onClearCompleted,
}) => {
  return (
    <div className={classes.footer}>
      <p className={classes.counter}>{itemsLeftText}</p>
      <div className={classes.filter}>
        {options.map((option) => (
          <button
            onClick={() => onChange(option)}
            className={clsx({
              [classes.button_active]: filterBy === option,
            })}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={onClearCompleted}>Clear completed</button>
    </div>
  );
};

export default Filter;
