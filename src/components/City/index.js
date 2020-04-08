import React, { useEffect, useState } from "react";

export default function City({ current, destiny, addDistance }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (current.distance) {
      const filteredTime = current.distance.find((c) => c.id === destiny.id);
      if (filteredTime) {
        setTime(filteredTime.time);
      } else {
        setTime("");
      }
    }
  }, [current, destiny]);

  function handleTime(e) {
    if (Number(e.target.value)) {
      setTime(e.target.value);
    } else {
      setTime(0);
    }
  }

  return (
    <>
      <div>{current && current.name}</div>
      <div>{destiny && destiny.name}</div>
      <input
        type="text"
        maxLength="3"
        value={time}
        onChange={handleTime}
        onBlur={() =>
          addDistance({ current, destiny: { id: destiny.id, time } })
        }
      />
    </>
  );
}
