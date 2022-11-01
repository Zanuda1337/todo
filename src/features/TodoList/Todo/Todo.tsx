import clsx from 'clsx';
import classes from 'src/features/TodoList/TodoList.module.scss';
import { Checkbox, Collapse } from '@mui/material';
import SvgSelector from 'src/components/SvgSelector/SvgSelector';
import React from 'react';
import { TTodo } from 'src/features/TodoList/Todo/Todo.types';

interface ITodoProps extends TTodo {
  onChangeIsCompleted: (id: number) => void;
}

const Todo: React.FC<ITodoProps> = ({
  id,
  task,
  isCompleted,
  onChangeIsCompleted,
}) => {
  return (
    <button
      className={clsx(classes.row, {
        [classes['row_highlighted']]: isCompleted,
      })}
      onClick={() => onChangeIsCompleted(id)}
    >
      <Checkbox
        checked={isCompleted}
        className={classes.checkbox}
        icon={
          <SvgSelector
            id="checkbox-unchecked"
            className={classes['checkbox-icon']}
          />
        }
        checkedIcon={
          <SvgSelector
            id="checkbox-checked"
            className={classes['checkbox-icon']}
          />
        }
        onChange={() => onChangeIsCompleted(id)}
      />
      <p className={classes.label}>{task}</p>
    </button>
  );
};

export default Todo;
