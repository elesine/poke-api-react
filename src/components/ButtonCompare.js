import React, { useEffect, useState } from "react";
import "../styles/ButtonCompare.css";
import axios from "axios";
import fetch from "react";

function ButtonCompare(props) {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [pokemon1Type, setPokemon1Type] = useState("");
  const [pokemon2Type, setPokemon2Type] = useState("");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const getAnswer = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${props.pokemon1}`
      );
      setPokemon1(response.data);
      //return response.data;
			
    };
    getAnswer();
  }, []);

  useEffect(() => {
    const getAnswer = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${props.pokemon2}`
      );
      setPokemon2(response.data);
      //return response.data;
    };
    getAnswer();
  }, []);

	useEffect(() => {
		if(pokemon1) {
			const getAnswer = async () => {
				const response = await axios.get(pokemon1.type.url);
				setPokemon1Type(response.data);
				//return response.data;
			};
			getAnswer();
		}
		}, []) ; 

  useEffect(() => {
		if(pokemon2) {
    const getAnswer = async () => {
      const response = await axios.get(pokemon2.type.url);
      setPokemon2Type(response.data);
      //return response.data;
    };
    getAnswer();
	}
  }, []);

  function versus() {
		if(pokemon1Type && pokemon2Type) {
			const pokemon1DamageTo = pokemon1Type.damage_relations.double_damage_to;
			const pokemon2DamageTo = pokemon2Type.damage_relations.double_damage_to;

			if (
				pokemon1DamageTo.find(
					(pokemon1DamageTo) => pokemon1DamageTo.name === pokemon2Type
				)
			) {
				setWinner(pokemon1);
				//	return pokemon1;
			} else if (
				pokemon2DamageTo.find(
					(pokemon2DamageTo) => pokemon2DamageTo.name === pokemon1Type
				)
			) {
				setWinner(pokemon2);
				//	return pokemon2;
			} else {
				setWinner("empate");
				//	return "Empate";
			}
		}
	}
  
  return (
    <>
      <button
        className="button-compare"
        onClick={(e) => {
          versus();
        }}
      >
        {props.children}
      </button>
    </>
  );
}

export default ButtonCompare;
