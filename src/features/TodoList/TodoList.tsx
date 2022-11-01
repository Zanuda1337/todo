import classes from './TodoList.module.scss';
import clsx from 'clsx';
import Todo from 'src/features/TodoList/Todo/Todo';
import Filter from 'src/features/TodoList/Filter/Filter';
import { TTodo } from 'src/features/TodoList/Todo/Todo.types';
import { TransitionGroup } from 'react-transition-group';
import { todoListMocks } from 'src/features/TodoList/TodoList.mocks';
import { filtrate, getItemsLeftString } from './TodoList.utils';
import {
  filterOptions,
  TFilterOptions,
} from 'src/features/TodoList/TodoList.types';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Collapse,
} from '@mui/material';
import TodoCreator from 'src/features/TodoList/TodoCreator';

const TodoList: React.FC = () => {
  const options = Object.values(filterOptions);
  const [todos, setTodos] = useState<TTodo[]>(todoListMocks.value);
  const [filterBy, setFilterBy] = useState<TFilterOptions>(filterOptions.all);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState<boolean>(false);
  const [task, setTask] = useState<string>('');
  const scrollArea = useRef<HTMLDivElement | null>(null);

  const itemsLeftText = getItemsLeftString(
    todos.filter((todo) => !todo.isCompleted).length
  );

  const filteredTodos = todos.filter((todo) => filtrate(todo, filterBy));

  const summaryClassName = clsx(classes.row, classes['collapse-button'], {
    [classes['collapse-button_highlighted']]: !isCollapsed,
  });

  const handleChangeIsCompleted = useCallback(
    (id: number) =>
      setTodos(
        [...todos].map((todoToChange) =>
          todoToChange.id === id
            ? {
                ...todoToChange,
                isCompleted: !todoToChange.isCompleted,
              }
            : todoToChange
        )
      ),
    [todos]
  );

  const handleClearCompleted = useCallback(
    () => setTodos(todos.filter((todo) => !todo.isCompleted)),
    [todos]
  );

  const handleOpenTodoCreator = useCallback(
    () => setIsTaskCreatorOpen(true),
    []
  );
  const handleCloseTodoCreator = useCallback(
    () => setIsTaskCreatorOpen(false),
    []
  );

  const handleAccordionChange = useCallback(
    () => setIsCollapsed(!isCollapsed),
    [isCollapsed]
  );

  const handleAddTodo = useCallback(() => {
    if (!task) return;
    setTodos([
      ...todos,
      {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        task: task,
        isCompleted: false,
      },
    ]);
    setIsTaskCreatorOpen(false);
    setIsCollapsed(false);
    setTask('');
  }, [task, todos]);

  const handleTaskChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTask(event.target.value),
    []
  );

  useEffect(() => {
    const currentScroll = scrollArea.current;
    if (currentScroll)
      setTimeout(
        () => currentScroll?.scrollTo(0, currentScroll.offsetHeight),
        300
      );
  }, [scrollArea, todos.length, filterBy]);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>todos</h1>
      <Accordion
        square={true}
        classes={{ root: classes.accordion }}
        elevation={2}
        expanded={!isCollapsed}
        onChange={handleAccordionChange}
        disableGutters={true}
      >
        <AccordionSummary
          expandIcon={<p className={classes.arrow}>❯</p>}
          classes={{
            root: summaryClassName,
            content: classes.summary,
            expandIconWrapper: classes.expanded,
          }}
        >
          <div className={summaryClassName}>
            <p className={classes.label}>What needs to be done?</p>
          </div>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes['accordion-details'] }}>
          <div className={classes.scroll} ref={scrollArea}>
            <TransitionGroup>
              {filteredTodos.length ? (
                filteredTodos.map((todo) => (
                  <Collapse key={todo.id}>
                    <Todo
                      key={todo.id}
                      id={todo.id}
                      task={todo.task}
                      isCompleted={todo.isCompleted}
                      onChangeIsCompleted={handleChangeIsCompleted}
                    />
                  </Collapse>
                ))
              ) : (
                <Collapse>
                  <p className={classes.text}>No tasks yet</p>
                </Collapse>
              )}
            </TransitionGroup>
          </div>
          <Filter
            options={options}
            filterBy={filterBy}
            itemsLeftText={itemsLeftText}
            onChange={(option) => setFilterBy(option)}
            onClearCompleted={handleClearCompleted}
          />
        </AccordionDetails>
      </Accordion>
      <div className={classes['add-button-wrapper']}>
        <Button
          variant="outlined"
          classes={{
            root: classes['add-button'],
          }}
          onClick={handleOpenTodoCreator}
          disableFocusRipple={true}
        >
          <p className={classes['add-button-text']}>Add todo</p>
        </Button>
      </div>
      <TodoCreator
        isTaskCreatorOpen={isTaskCreatorOpen}
        task={task}
        onTaskChange={handleTaskChange}
        onCloseTodoCreator={handleCloseTodoCreator}
        onAddTodo={handleAddTodo}
      />
    </div>
  );
};

export default TodoList;
