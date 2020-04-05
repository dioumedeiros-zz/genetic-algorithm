import React from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

export default function Todo({ data, edit, exclude }) {
  return (
    <>
      <div>{data.task}</div>
      <div>{data.done === "S" ? "Concluída" : "Não concluída"}</div>
      <MdModeEdit size={20} color="#33b9c8" />
      <MdDeleteForever
        size={20}
        color="#ff1a1ae8"
        onClick={() => exclude(data)}
      />
    </>
  );
}
