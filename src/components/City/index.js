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
