import { TTodo } from 'src/features/TodoList/Todo/Todo.types';
import {
  filterOptions,
  TFilterOptions,
} from 'src/features/TodoList/TodoList.types';

export const getItemsLeftString = (number: number): string => {
  if (number === 1) return `${number} item left`;
  if (number === 0) return 'All completed';
  return `${number} items left`;
};

export const filtrate = (todo: TTodo, filterBy: TFilterOptions): boolean => {
  if (filterBy === filterOptions.completed) return todo.isCompleted;
  if (filterBy === filterOptions.active) return !todo.isCompleted;
  return true;
};
