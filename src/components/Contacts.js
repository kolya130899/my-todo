import React from "react";

import "./css/Contacts.css";

function generateId() {
  return `${new Date().getTime()}${Math.random()}`;
}

const initialTodos = [
  {
    id: generateId(),
    createdAt: new Date(),
    text: "todo1",
    isDone: false
  },
  {
    id: generateId(),
    createdAt: new Date(),
    text: "todo2",
    isDone: false
  },
  {
    id: generateId(),
    createdAt: new Date(),
    text: "todo3",
    isDone: true
  }
];

const FILTER_STATES = {
  ALL: "ALL",
  ACTIVE: "ACTIVE"
};

// function filterTodos(todos, filterName) {
//   if (filterName === FILTER_STATES.ACTIVE) {
//     return todos.filter(todo => !todo.isDone);
//   }

//   return todos;
// }

export default class Todos extends React.Component {
  state = {
    todos: initialTodos,
    filterName: FILTER_STATES.ALL,
    newTodoText: ""
  };

  showFiltered = filterName => () => {
    this.setState({
      filterName
    });
  };

  getFilteredTodos() {
    if (this.state.filterName === FILTER_STATES.ACTIVE) {
      return this.state.todos.filter(todo => !todo.isDone);
    }

    return this.state.todos;
  }

  handleNewTodoText = event => {
    this.setState({ newTodoText: event.target.value });
  };

  handleIsDone = todo => event => {
    this.setState({
      todos: this.state.todos.map(item => {
        if (item !== todo) return item;

        return {
          ...item,
          isDone: event.target.checked
        };
      })
    });
  };

  addNewTodo = event => {
    event.preventDefault();
    const newTodo = {
      id: generateId(),
      createdAt: new Date(),
      text: this.state.newTodoText,
      isDone: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
      newTodoText: ""
    });
  };

  render() {
    return (
      <div className="Todos">
        <button onClick={this.showFiltered(FILTER_STATES.ALL)}>All</button>
        <button onClick={this.showFiltered(FILTER_STATES.ACTIVE)}>
          Active
        </button>

        <form onSubmit={this.addNewTodo}>
          <input
            value={this.state.newTodoText}
            onChange={this.handleNewTodoText}
          />
          <button type="submit">Add</button>
        </form>

        {this.getFilteredTodos().map(item => (
          <div key={item.id} className={item.isDone ? "is-done" : ""}>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={this.handleIsDone(item)}
            />
            {item.text}
            <span>({item.createdAt.toISOString()})</span>
          </div>
        ))}
      </div>
    );
  }
}
