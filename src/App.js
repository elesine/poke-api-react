import React, { useState, useEffect } from "react";
import "./App.css";
import pokeApiLogo from "./img/pokeapi.png";
import Pokemon from "./components/Pokemon";
import Form from "./components/Form";
import axios from "axios";

function App() {
  const [pokemon1Name, setPokemon1Name] = useState("");
  const [pokemon2Name, setPokemon2Name] = useState("");
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [pokemon1Type, setPokemon1Type] = useState("");
  const [pokemon2Type, setPokemon2Type] = useState("");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (pokemon1Name !='') {
      const getAnswer = async () => {
        try{
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon1Name}`
          );
          if(response.status == 200) {
            setPokemon1(response.data);
          }
        }
        catch (error) {
          console.log(error);
          alert(`Error name pokemon. ${error.response.data}`);
        }
      };
      getAnswer();
    }
  }, [pokemon1Name]);

  useEffect(() => {
    if (pokemon2Name !='') {
      const getAnswer = async () => {
        try{
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon2Name}`
          );
          if(response.status == 200) {
            setPokemon2(response.data);
          }
        }
        catch (error) {
          console.log(error);
          alert(`Error name pokemon. ${error.response.data}`);
        }
      };
    getAnswer();
  }
  }, [pokemon2Name]);

  useEffect(() => {
    if (pokemon1 != '') {
      const getAnswer = async () => {
        try{
          const response = await axios.get(pokemon1.types[0].type.url);
          if(response.status == 200) {
            setPokemon1Type(response.data);
          }
        }
        catch (error) {
          console.log(error);
          alert(`Error finding Pokemon Type. ${error.response.data}`);
        }

      };
      getAnswer();
    }
  }, [pokemon1]);

  useEffect(() => {
    if (pokemon2 != '') {
      const getAnswer = async () => {
        try{
          const response = await axios.get(pokemon2.types[0].type.url);
          if(response.status == 200) {
            setPokemon2Type(response.data);
          }
        }
        catch (error) {
          console.log(error);
          alert(`Error finding Pokemon Type. ${error.response.data}`);
        }
      };
      getAnswer();
    }
  }, [pokemon2]);

  function versus() {
    if (pokemon1Type && pokemon2Type) {
      const pokemon1DamageTo = pokemon1Type.damage_relations.double_damage_to;
      const pokemon2DamageTo = pokemon2Type.damage_relations.double_damage_to;
      if (
        pokemon1DamageTo.find(
          (pokemon1DamageTo) =>
            pokemon1DamageTo.name == pokemon2Type.name
        )
      ) {
        setWinner(pokemon1Name);
        console.log("The winner is: " + pokemon1Name);
      } else if (
        pokemon2DamageTo.find(
          (pokemon2DamageTo) =>
            pokemon2DamageTo.name == pokemon1Type.name
        )
      ) {
        setWinner(pokemon2Name);
        console.log("The winner is: " + pokemon2Name);
      } else {
        setWinner("Tie");
        console.log("It is a " + winner);
      }
    }
    console.log("Winner!!! " + winner);
  }

  return (
    <div className="App">
      <div className="pokeapi-logo-container">
        <img className="pokeapi-logo" src={pokeApiLogo} alt="PokeApi Logo" />
      </div>
      <div className="main-container">
        <div className="row">
          <Form setPokemonName={setPokemon1Name} ></Form>
          <Form setPokemonName={setPokemon2Name} ></Form>
        </div>

        <div className="row">
          {pokemon1? <Pokemon name={pokemon1Name} pokemon={pokemon1} win={pokemon1Name==winner || winner =='Tie'}> </Pokemon> : <></>}

          {pokemon2? <Pokemon name={pokemon2Name} pokemon={pokemon2} win={pokemon2Name==winner || winner =='Tie'}> </Pokemon> : <></>}
        </div>

        <div className="row">     
            <button
              className="button-compare"
              onClick={(e) => versus()}
            >
              Versus
            </button> 
        </div>
      </div>
    </div>
  );
}

export default App;
