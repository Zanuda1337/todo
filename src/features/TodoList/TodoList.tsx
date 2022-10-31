import classes from './TodoList.module.scss';
import React, { useState } from 'react';
import { Checkbox, Collapse, Paper } from '@mui/material';
import clsx from 'clsx';
import SvgSelector from 'src/components/SvgSelector/SvgSelector';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: 'Тестовое задание',
      isCompleted: false,
    },
    {
      id: 2,
      task: 'Прекрасный код',
      isCompleted: true,
    },
    {
      id: 3,
      task: 'Покрытие тестами',
      isCompleted: false,
    },
  ]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const collapseButtonClassName = clsx(
    classes.row,
    classes['collapse-button'],
    {
      [classes['collapse-button_highlighted']]: isCollapsed,
    }
  );
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>todos</h1>
      <Paper className={classes.list} elevation={2} square={true}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={collapseButtonClassName}
        >
          <p className={classes.arrow}>❯</p>
          <p className={classes.label}>What needs to be done?</p>
        </button>
        <Collapse orientation="vertical" in={isCollapsed} collapsedSize={0}>
          {todos.map((todo) => (
            <button
              key={todo.id}
              className={clsx(classes.row, {
                [classes['row_highlighted']]: todo.isCompleted,
              })}
            >
              <Checkbox
                checked={todo.isCompleted}
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
                onChange={() =>
                  setTodos(
                    [...todos].map((todoToChange) =>
                      todoToChange.id === todo.id
                        ? {
                            ...todoToChange,
                            isCompleted: !todoToChange.isCompleted,
                          }
                        : todoToChange
                    )
                  )
                }
              />
              <p className={classes.label}>{todo.task}</p>
            </button>
          ))}
        </Collapse>
      </Paper>
    </div>
  );
};

export default TodoList;
