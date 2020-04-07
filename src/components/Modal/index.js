import React from "react";
import Popup from "reactjs-popup";
import { MdKeyboardArrowRight } from "react-icons/md";

import "./styles.css";

export default function Modal({ open, data, close }) {
  return (
    <Popup open={open} modal closeOnDocumentClick onClose={close}>
      {(close) => (
        <div className="modal">
          <header>
            <span>Melhor caminho</span>
          </header>
          <ul>
            {data.chromosome.map((item) => (
              <div key={item.id}>
                <li>{item.name}</li>
                <MdKeyboardArrowRight />
              </div>
            ))}
            <li className="last">{data.chromosome[0].name}</li>
          </ul>
          <hr />
          <div className="grid-modal">
            <span className="title">Distância</span>
            <span className="value">{data.allDistance}</span>
          </div>
          <div className="control">
            <button className="close" onClick={close}>
              Confirmar
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
