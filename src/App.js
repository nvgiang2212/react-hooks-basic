import { useEffect, useState } from 'react';
import './App.scss';
import PostList from './components/PostList';
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

  const [postList, setPostList] = useState([])

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1'
        const response = await fetch(requestUrl)
        const responseJSON = await response.json()
        const { data } = responseJSON
        setPostList(data)
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message)
      }
    }

    console.log('GET POST LIST useEffect')
    fetchPostList()
  }, [])

  useEffect(() => {
    console.log('ONCE')
  })

  useEffect(() => {
    console.log('DEL OR ADD TODO LIST')
  }, [todoList])

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
      <hr />
      <PostList posts={postList} />
    </div>
  );
}

export default App;
