export enum filterOptions {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export type TFilterOptions =
  | filterOptions.all
  | filterOptions.active
  | filterOptions.completed;
