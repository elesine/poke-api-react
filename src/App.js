import React, { useState } from "react";
import "./App.css";
import pokeApiLogo from "./img/pokeapi.png";
import Pokemon from "./components/Pokemon";
import ButtonCompare from "./components/ButtonCompare";

function App() {
  const [pokemon1Name, setPokemon1Name] = useState("");
  const [pokemon2Name, setPokemon2Name] = useState("");
  const [pokemon1Submit, setPokemon1Submit] = useState(false);
  const [pokemon2Submit, setPokemon2Submit] = useState(false);

  const handleSubmit1 = (e) => {
    e.preventDefault();
    alert("You have submitted " + pokemon1Name);
    setPokemon1Submit(true);
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    alert("You have submitted " + pokemon2Name);
    setPokemon2Submit(true);
  };

  return (
    <div className="App">
      <div className="pokeapi-logo-container">
        <img className="pokeapi-logo" src={pokeApiLogo} alt="PokeApi Logo" />
      </div>
      <div className="main-container">
        <div className="row">
          <form className="form" onSubmit={handleSubmit1}>
            <div className="form-control">
              <label htmlFor="pokemon1Name">Pokemon 1 Name: </label>
              <input
                type="text"
                id="pokemon1Name"
                name="pokemon1Name"
                value={pokemon1Name}
                onChange={(e) => setPokemon1Name(e.target.value)}
              />
            </div>
            <button type="submit">Add pokemon</button>
          </form>

          <form className="form" onSubmit={handleSubmit2}>
            <div className="form-control">
              <label htmlFor="pokemon2Name">Pokemon 2 Name: </label>
              <input
                type="text"
                id="pokemon2Name"
                name="pokemon2Name"
                value={pokemon2Name}
                onChange={(e) => setPokemon2Name(e.target.value)}
              />
            </div>
            <button type="submit">Add pokemon</button>
          </form>
        </div>

        <div className="row">
          {pokemon1Submit ? <Pokemon name={pokemon1Name}> </Pokemon> : <></>}
          {pokemon2Submit ? <Pokemon name={pokemon2Name}> </Pokemon> : <></>}
        </div>

        <div className="row">
          {pokemon1Submit && pokemon2Submit ? (
            <ButtonCompare pokemon1={pokemon1Name} pokemon2={pokemon2Name}>
              Comparar
            </ButtonCompare>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
