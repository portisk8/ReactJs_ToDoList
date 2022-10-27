export const pokemonListGetAsync = async (filter) => {
  let limit = filter?.limit || 20;
  let offset = filter?.offset || 0;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  let pokemonList = await response.json();
  if (pokemonList.next) {
    const urlNextParams = new URLSearchParams(pokemonList.next.split("?")[1]);
    pokemonList.nextFilter = {
      limit: urlNextParams.get("limit"),
      offset: urlNextParams.get("offset"),
    };
  }
  if (pokemonList.previous) {
    const urlPreviousParams = new URLSearchParams(
      pokemonList.previous.split("?")[1]
    );
    pokemonList.previousFilter = {
      limit: urlPreviousParams.get("limit"),
      offset: urlPreviousParams.get("offset"),
    };
  }
  return pokemonList;
};
export const pokemonDetailGetAsync = async (url) => {
  const response = await fetch(url);
  return response.json();
};
export const pokemonListWithDetailsGetAsync = async (filter) => {
  let limit = filter?.limit || 20;
  let offset = filter?.offset || 0;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  let pokemonList = await response.json();
  if (pokemonList.next) {
    const urlNextParams = new URLSearchParams(pokemonList.next.split("?")[1]);
    pokemonList.nextFilter = {
      limit: urlNextParams.get("limit"),
      offset: urlNextParams.get("offset"),
    };
  }
  if (pokemonList.previous) {
    const urlPreviousParams = new URLSearchParams(
      pokemonList.previous.split("?")[1]
    );
    pokemonList.previousFilter = {
      limit: urlPreviousParams.get("limit"),
      offset: urlPreviousParams.get("offset"),
    };
  }
  for (const pokemon of pokemonList.results) {
    const responsePokemon = await fetch(pokemon.url);
    if (responsePokemon) pokemon.data = await responsePokemon.json();
  }
  return pokemonList;
};
