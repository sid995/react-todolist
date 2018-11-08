import React from "react";

export default props => (
  <div
    style={{
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      margin: "5px 0"
    }}
  >
    <div
      style={{
        marginRight: "5px",
        textDecoration: props.todo.complete ? "line-through" : ""
      }}
      onClick={props.toggleComplete}
    >
      {props.todo.text}
    </div>
    <button onClick={props.deleteTodo}>X</button>
  </div>
);
