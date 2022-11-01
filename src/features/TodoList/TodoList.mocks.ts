import {TTodo} from "src/features/TodoList/Todo/Todo.types";

export const todoListMocks: {value: TTodo[]} = {
	value: [
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
	]
}
