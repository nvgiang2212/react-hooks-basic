import { useEffect, useState } from 'react';
import './App.scss';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Pagination from './components/Pagination';
import queryString from 'query-string'
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';

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

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  })

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: ''
  })

  function handleOnPageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage
    })
  }

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsUrl = queryString.stringify(filters)
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsUrl}`
        const response = await fetch(requestUrl)
        const responseJSON = await response.json()
        const { data, pagination } = responseJSON
        setPostList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message)
      }
    }

    console.log('GET POST LIST useEffect')
    fetchPostList()
  }, [filters])

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

  function handleFiltersChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm
    })
  }

  const [showClock, setShowClock] = useState(true)

  return (
    <div className="app">
      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Hide Clock</button>
      <hr />
      <BetterClock />
      <hr />

      <h1>React Hooks - TodoList!</h1>

      <TodoForm onSubmitForm={handleSubmit} />
      <TodoList todos={todoList} onClickTodoList={handleClick} />
      <hr />

      <h1>React Hooks - Post List</h1>
      <PostFiltersForm onSubmitFiltersForm={handleFiltersChange} />
      <PostList posts={postList} />

      <Pagination pagination={pagination} onPageChange={handleOnPageChange} />
    </div>
  );
}

export default App;
