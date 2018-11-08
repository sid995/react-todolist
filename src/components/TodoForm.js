import React, { Component } from "react";
import shortid from "shortid";

export default class TodoForm extends Component {
  state = {
    text: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (event.target.value !== "" || event.target.value !== null) {
      this.props.onSubmit({
        id: shortid.generate(),
        text: this.state.text,
        complete: false
      });
    }
    this.setState({ text: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          placeholder="Todos..."
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Add Todo</button>
      </form>
    );
  }
}
