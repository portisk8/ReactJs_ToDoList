import React, { useState } from "react";

function Card({ pokemon }) {
  return (
    <div>
      <div>{pokemon.name}</div>
      <img src={pokemon.data.sprites.front_default} />
    </div>
  );
}

export default Card;
