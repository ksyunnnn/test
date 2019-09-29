import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

const baseUrl = "https://jsonbox.io/box_ca96d31d39361c391d71";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTodoValue = event => {
    setTodoValue(event.target.value);
  };

  const getTodoList = () => {
    setLoading(true);
    axios
      .get(baseUrl)
      .then(response => {
        setTodoList(response.data[0].todos);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const initTodoList = () => {
    axios
      .post(baseUrl, {
        todos: ["寿司ざんまいに行く", "鳥貴族にいく"]
      })
      .then(response => {
        alert("success");
        console.log("success", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const updateTodoList = () => {
    setTodoList([...todoList, todoValue]);
    setTodoValue("");
    axios
      .put(`${baseUrl}/5d9042af71cce900175d678b`, {
        todos: [...todoList, todoValue]
      })
      .then(response => {
        alert("success");
        console.log("success", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <h2>やりたいことリスト</h2>

      <p>{loading ? "loading..." : ""}</p>
      <div className="todo-wrapper">
        {todoList.map((v, i) => {
          return <li key={i}>{v}</li>;
        })}
      </div>

      <div className="todo-action">
        <input value={todoValue} onChange={handleTodoValue} />
        <button onClick={updateTodoList}>追加</button>
      </div>

      <button onClick={initTodoList}>データ初期化</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
