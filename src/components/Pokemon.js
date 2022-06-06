import React, { useEffect, useState } from "react";
import "../styles/Pokemon.css";
import axios from "axios";

function Pokemon({ name }) {
  const [pokemon, setPokemon] = useState("");

  useEffect(() => {
    const getAnswer = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemon(response.data);
      // return response.data;
    };
    getAnswer();
  }, []);

  return (
    <div className="pokemon-contenedor">
      <p className="pokemon-name">
        <strong>{name}</strong>
      </p>
      <img
        className="pokemon-img"
        src={pokemon ? pokemon.sprites.other.dream_world.front_default : ""}
        id={name}
        alt={name}
      />
    </div>
  );
}

export default Pokemon;
