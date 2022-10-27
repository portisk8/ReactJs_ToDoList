import React, { useEffect, useState } from "react";
import { pokemonDetailGetAsync } from "../services/podedexService";

function Card({ pokemonData }) {
  const [pokemon, setPokemon] = useState();
  const [isHover, setIsHover] = useState();
  const [expanded, setExpanded] = useState();

  const getPokemon = async () => {
    const response = await pokemonDetailGetAsync(pokemonData.url);
    if (response) setPokemon(response);
  };

  useEffect(() => {
    getPokemon();
  }, [pokemonData]);

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setExpanded(!expanded)}
    >
      {pokemon && (
        <div>
          {isHover ? (
            <img src={pokemon.sprites.back_default} />
          ) : (
            <img src={pokemon.sprites.front_default} />
          )}
        </div>
      )}
      <div className="card-name">{pokemonData.name}</div>
      {expanded && (
        <div>
          <div>
            Type:{" "}
            {pokemon.types.map((t) => (
              <span>{t.type.name}</span>
            ))}
          </div>
          <div>
            Abilities:
            <ul>
              {pokemon.abilities.map((t) => (
                <li>{t.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
