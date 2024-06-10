import "./App.css";
import TrashIcon from "./trash.svg";
import { useState, useEffect } from "react";
function App() {
  // declaring the todo local storage
  let initialTodo;
  if (localStorage.getItem("todos") === null) {
    initialTodo = [];
  } else {
    initialTodo = JSON.parse(localStorage.getItem("todos"));
  }
  // setting form value
  const [formVal, setFormVal] = useState("");
  const formValue = (e) => {
    if (e) {
      setFormVal(e.target.value);
    }
  };
  // setting todo value on submitting the button
  const submit = (e) => {
    e.preventDefault();
    if (formVal !== "") {
      let index;
      if (todos.length === 0) {
        index = 0;
      } else {
        index = todos[todos.length - 1].index + 1;
      }
      const date = new Date();
      var todoObject = {
        index: index,
        todoTitle: formVal,
        date: date.toLocaleString("en-US", { timeZoneName: "short" }),
      };
      setTodos([...todos, todoObject]);
      console.log(todoObject);
      console.log(todoObject.index);
      console.log(todos.length);
      setFormVal("");
    }
  };
  const deleteTodo = (item) => {
    setTodos(
      todos.filter((e) => {
        return e !== item;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const [todos, setTodos] = useState(initialTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>To Do List</h1>
        <form className={"form"} name="form">
          <input
            type="text"
            id="todo"
            name="todo"
            required
            placeholder="Your Todo"
            value={formVal}
            onChange={formValue}
          />
          <button id="submit" name="submit" className={"btn"} onClick={submit}>
            {"Add"}
          </button>
        </form>
        <h4>All of Your Todos</h4>
        {todos.length === 0 ? (
          <h5>No todos are there</h5>
        ) : (
          todos.map((todo) => {
            return (
              <div key={todo.index} className="card-row">
                <div className="card">
                  <h4>{todo.todoTitle}</h4>
                  <p>Date: {todo.date}</p>
                  <div className="title-row">
                    <img
                      alt="trash icon"
                      src={TrashIcon}
                      onClick={() => {
                        deleteTodo(todo);
                      }}
                      className="delete-btn"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
