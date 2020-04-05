import React, { useContext, useState, useEffect } from "react";

import "./styles.css";

export default function Header() {
  const [taskDone, setTaskDone] = useState("");
  const [taskNotDone, setTaskNotDone] = useState("");

  /**
   * Utilizado useEfect para carregar variáveis da todolist no context
   */
  // useEffect(() => {
  //   const filterDone = todoList.filter((todo) => todo.done === "S");
  //   setTaskDone(filterDone);
  //   const filterNotDone = todoList.filter((todo) => todo.done === "N");
  //   setTaskNotDone(filterNotDone);
  // }, [todoList]);

  return (
    <div className="container-header">
      <div className="content-header">
        <nav>
          {/* <p data-testid="tasks">TODAS TAREFAS: {todoList.length}</p> */}
          <p data-testid="tasks-done">TAREFAS CONCLUÍDAS: {taskDone.length}</p>
          <p data-testid="tasks-not-done">
            TAREFAS NÃO CONCLUÍDAS: {taskNotDone.length}
          </p>
        </nav>
      </div>
    </div>
  );
}
