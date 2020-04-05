import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import City from "../City";

import "./styles.css";

export default function TodoList({ filter }) {
  // const [todoList, setTodoList] = useContext(TodoContext);
  const [todoFilter, setTodoFilter] = useState();

  /**
   * Utilizado useEffect para efetuar filtro de TODO através da
   * Escolha da combo
   */
  // useEffect(() => {
  //   setTodoFilter(todoList);
  //   if (filter && filter !== "T") {
  //     const newTodoFilter = todoList.filter((todo) => todo.done === filter);
  //     setTodoFilter(newTodoFilter);
  //   }
  // }, [filter, todoList]);

  /**
   * Método de exlusão de TODO, salvando no localStorage
   */
  function exclude(data) {
    // const newList = todoList.filter((todo) => todo.id !== data.id);
    // setTodoList(newList);
    // localStorage.setItem("todoList", JSON.stringify(newList));

    toast.success("Tarefa deletada com sucesso");
  }

  return (
    <div data-testid="data-grid" className="grid">
      <div data-testid="data-header" className="header">
        <div>Origem</div>
        <div>Destino</div>
        <div>Distância</div>
      </div>
      <div data-testid="data-items" className="items">
        {todoFilter
          ? todoFilter.map((todo) => (
              <City key={todo.id} data={todo} exclude={exclude} />
            ))
          : ""}
      </div>
    </div>
  );
}
