import React, { useState } from "react";

export default function City({ current, destiny, addDistance }) {
  const [time, setTime] = useState("");
  return (
    <>
      <div>{current && current.name}</div>
      <div>{destiny && destiny.name}</div>
      <input
        type="text"
        maxLength="3"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onBlur={() =>
          addDistance({ current, destiny: { id: destiny.id, time } })
        }
      />
    </>
  );
}
