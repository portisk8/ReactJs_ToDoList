import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { pokemonListGetAsync } from "../services/podedexService";

const filterDefault = {
  limit: 50,
  offset: 0,
};

function Home() {
  const [filter, setFilter] = useState(filterDefault);
  const [pokemonList, setPokemonList] = useState(null);

  const searchPokemon = async (filter) => {
    setFilter(filter);
    const response = await pokemonListGetAsync(filter);
    console.log(response);
    setPokemonList(response);
  };

  useEffect(() => {
    searchPokemon(filter);
  }, []);
  return (
    <div>
      Home2
      <div className="Card-container">
        {pokemonList?.results?.map((p) => (
          <Card pokemonData={p}></Card>
        ))}
      </div>
      <div>
        {pokemonList?.previousFilter && (
          <div onClick={() => searchPokemon(pokemonList?.previousFilter)}>
            <a>{"<"} PREVIOUS</a>
          </div>
        )}{" "}
        -
        {pokemonList?.nextFilter && (
          <div onClick={() => searchPokemon(pokemonList?.nextFilter)}>
            <a>NEXT {">"}</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
