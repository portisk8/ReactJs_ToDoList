import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { pokemonListGetAsync } from "../services/podedexService";

const filterDefault = {
  limit: 30,
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
      <img
        className="img-title"
        src="https://www.freepnglogos.com/uploads/gotta-catch-em-all-transparent-pokemon-logo-11.png"
      />
      <div className="Card-container">
        {pokemonList?.results?.map((p) => (
          <Card pokemonData={p}></Card>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {pokemonList?.previousFilter && (
          <div
            className="button-footer"
            onClick={() => searchPokemon(pokemonList?.previousFilter)}
          >
            <b>
              <a>{"<"} PREVIOUS</a>
            </b>
          </div>
        )}
        {pokemonList?.nextFilter && pokemonList?.previousFilter && (
          <b style={{ color: "white", marginLeft: 5, marginRight: 5 }}>-</b>
        )}
        {pokemonList?.nextFilter && (
          <div
            className="button-footer"
            onClick={() => searchPokemon(pokemonList?.nextFilter)}
          >
            <b>
              <a>NEXT {">"}</a>
            </b>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
