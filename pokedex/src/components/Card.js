import React, { useEffect, useState } from "react";
import { pokemonDetailGetAsync } from "../services/podedexService";

function Card({ pokemonData }) {
  const [pokemon, setPokemon] = useState();

  const getPokemon = async () => {
    const response = await pokemonDetailGetAsync(pokemonData.url);
    if (response) setPokemon(response);
  };

  useEffect(() => {
    getPokemon();
  }, [pokemonData]);

  return (
    <div>
      {pokemon && (
        <div>
          <img src={pokemon.sprites.front_default} />
        </div>
      )}
      <div>{pokemonData.name}</div>
    </div>
  );
}

export default Card;
