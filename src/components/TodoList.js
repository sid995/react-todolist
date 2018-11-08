import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export default class TodoList extends Component {
  state = {
    todos: [],
    todosToShow: "all",
    toggleAllComplete: true
  };
  addTodo = todo => {
    if (todo.text === null || todo.text === "") {
      this.setState(state => ({
        todos: [...state.todos]
      }));
    } else {
      this.setState(state => ({
        todos: [todo, ...state.todos]
      }));
    }
  };

  toggleComplete = id => {
    this.setState(state => ({
      todos: state.todos.map(todo => {
        if (todo.id === id) {
          // suppose to update
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    }));
  };

  updateTodoToShow = btnClicked => {
    if (btnClicked === "all") {
      this.setState({
        todosToShow: "all"
      });
    } else if (btnClicked === "active") {
      this.setState({
        todosToShow: "active"
      });
    } else if (btnClicked === "complete") {
      this.setState({
        todosToShow: "complete"
      });
    }
  };

  handleDeleteTodo = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }));
  };

  removeAllTodosThatAreComplete = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.complete)
    }));
  };

  render() {
    let todos = [];
    if (this.state.todosToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todosToShow === "active") {
      todos = this.state.todos.filter(todo => !todo.complete);
    } else if (this.state.todosToShow === "complete") {
      todos = this.state.todos.filter(todo => todo.complete);
    }
    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={() => this.toggleComplete(todo.id)}
            deleteTodo={() => this.handleDeleteTodo(todo.id)}
          />
        ))}
        <div>
          Todos left: {this.state.todos.filter(todo => !todo.complete).length}
        </div>
        <div>
          <button onClick={() => this.updateTodoToShow("all")}>All</button>
          <button onClick={() => this.updateTodoToShow("active")}>
            Active
          </button>
          <button onClick={() => this.updateTodoToShow("complete")}>
            Complete
          </button>
        </div>
        {this.state.todos.some(todo => todo.complete) ? (
          <div>
            <button onClick={this.removeAllTodosThatAreComplete}>
              Remove All Complete Todos
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() =>
              this.setState(state => ({
                todos: state.todos.map(todo => ({
                  ...todo,
                  complete: state.toggleAllComplete
                })),
                toggleAllComplete: !state.toggleAllComplete
              }))
            }
          >
            Toggle All Complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}
