import { useState } from 'react';
import './App.scss';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const initList = [
  { id: 1, title: 'I love Easy Frontend! 😍 ' },
  { id: 2, title: 'We love Easy Frontend! 🥰 ' },
  { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  { id: 4, title: 'I love Easy Frontend! 😍 ' },
  { id: 5, title: 'We love Easy Frontend! 🥰 ' },
  { id: 6, title: 'They love Easy Frontend! 🚀 ' }
]

function App() {
  const [todoList, setTodoList] = useState(initList)

  function handleClick(todo) {
    const index = todoList.findIndex(item => item.id === todo.id)
    if (index < 0) return;

    const newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
  }

  function handleSubmit(formValues) {
    // add new todo to current todo List
    const newTodo = {
      id: todoList.length + 1,
      ...formValues
    }
    const newTodoList = [...todoList]
    newTodoList.push(newTodo)
    setTodoList(newTodoList)
  }

  return (
    <div className="app">
      <h1>React Hooks - TodoList!</h1>

      <TodoForm onSubmitForm={handleSubmit} />
      <TodoList todos={todoList} onClickTodoList={handleClick} />
    </div>
  );
}

export default App;
