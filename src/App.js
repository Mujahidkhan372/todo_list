import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'
import { stringify } from 'uuid'

function App() {
  const [todos, setTodo] = useState([])
  const todoRef = useRef()

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  function handleAddTodo(e) {
    const name = todoRef.current.value;
    if (name === '') return
    setTodo(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoRef.current.value = null
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodo(newTodos)
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodo(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleClear() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodo(newTodos)
  }

  return (
    <>
      <TodoList toggleTodo={toggleTodo} todos={todos} />
      <input ref={todoRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClear}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left todo</div>
    </>
  )
}

export default App;
