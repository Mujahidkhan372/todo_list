import React from 'react'

export default function Todo({ todo, toggleTodo }) {

    function toggleTodoHandler() {
        toggleTodo(todo.id)
    }

    return (
        <label>
            <input type="checkbox" checked={todo.complete} onChange={toggleTodoHandler} />
            {todo.name}
        </label>
    )
}
