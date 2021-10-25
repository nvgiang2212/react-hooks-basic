import React from 'react'
import PropTypes from 'prop-types'

function TodoList(props) {
  const { todos, onClickTodoList } = props

  function handleClickDel(todo) {
    if (onClickTodoList) {
      onClickTodoList(todo)
    }
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}><button onClick={() => handleClickDel(todo)}>Delete</button>{todo.title}</li>
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onClickTodoList: PropTypes.func,
}

TodoList.defaultProps = {
  todos: [],
  onClickTodoList: null,
}

export default TodoList

