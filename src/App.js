import React, { useState, useEffect } from "react";
import "./App.css";
import pokeApiLogo from "./img/pokeapi.png";
import Pokemon from "./components/Pokemon";
import PokemonInput from "./components/PokemonInput";
import axios from "axios";

function App() {
  const [pokemon1Name, setPokemon1Name] = useState("");
  const [pokemon2Name, setPokemon2Name] = useState("");
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [pokemon1Type, setPokemon1Type] = useState("");
  const [pokemon2Type, setPokemon2Type] = useState("");
  const [winner, setWinner] = useState("");

  const callApi = async (url, callback) => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        callback(response.data);
      }
    } catch (error) {
      console.log("Error Endpoint: ", url);
      console.log(error);
      alert(`Error name pokemon. ${error.response.data}`);
    }
  };

  useEffect(() => {
    if (pokemon1Name !== "") {
      callApi(
        `https://pokeapi.co/api/v2/pokemon/${pokemon1Name}`,
        setPokemon1
      );
    }
  }, [pokemon1Name]);

  useEffect(() => {
    if (pokemon2Name !== "") {
      callApi(
        `https://pokeapi.co/api/v2/pokemon/${pokemon2Name}`,
        setPokemon2
      );
    }
  }, [pokemon2Name]);

  useEffect(() => {
    if (pokemon1 !== "") {
      callApi(pokemon1.types[0].type.url, setPokemon1Type);
    }
  }, [pokemon1]);

  useEffect(() => {
    if (pokemon2 !== "") {
      callApi(pokemon2.types[0].type.url, setPokemon2Type);
    }
  }, [pokemon2]);

  function versus() {
    if (pokemon1Type && pokemon2Type) {
      const pokemon1DamageTo = pokemon1Type.damage_relations.double_damage_to;
      const pokemon2DamageTo = pokemon2Type.damage_relations.double_damage_to;
      if (
        pokemon1DamageTo.find(
          (pokemon1DamageTo) => pokemon1DamageTo.name === pokemon2Type.name
        )
      ) {
        setWinner(pokemon1Name);
        console.log("The winner is: " + pokemon1Name);
      } else if (
        pokemon2DamageTo.find(
          (pokemon2DamageTo) => pokemon2DamageTo.name === pokemon1Type.name
        )
      ) {
        setWinner(pokemon2Name);
        console.log("The winner is: " + pokemon2Name);
      } else {
        setWinner("both");
        console.log("The winners are " + winner);
      }
    }
  }

  return (
    <div className="App">
      <div className="pokeapi-logo-container">
        <img className="pokeapi-logo" src={pokeApiLogo} alt="PokeApi Logo" />
      </div>

      <div className="main-container">
        <div className="row">
          <PokemonInput setPokemonName={setPokemon1Name} />
          <PokemonInput setPokemonName={setPokemon2Name} />
        </div>

        <div className="row">
          {pokemon1 ? (
            <Pokemon
              pokemon={pokemon1}
              isWinner={pokemon1Name === winner || winner === "both"}
            />
          ) : null}

          {pokemon2 ? (
            <Pokemon
              pokemon={pokemon2}
              isWinner={pokemon2Name === winner || winner === "both"}
            />
          ) : null}
        </div>

        <div className="row">
          <button className="button-compare" onClick={(e) => versus()}>
            Versus
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
