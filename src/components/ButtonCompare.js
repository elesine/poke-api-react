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
		if(pokemon1!=undefined) {
			const getAnswer = async () => {
				const response = await axios.get(pokemon1.types[0].type.url);
				setPokemon1Type(response.data);
				//return response.data;
			};
			getAnswer();
		}
		}, []) ; 

  useEffect(() => {
		if(pokemon2!=undefined) {
    const getAnswer = async () => {
      const response = await axios.get(pokemon2.types[0].type.url);
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
      // console.log('poke1-damage-to', pokemon1DamageTo);
      // console.log('poke2-damage-to', pokemon2DamageTo);
      // console.log('tipo pokemon1' , pokemon1.types[0].type.name);
      // console.log('tipo pokemon2' , pokemon2.types[0].type.name);

      if (
				pokemon1DamageTo.find(
					(pokemon1DamageTo) => pokemon1DamageTo.name == pokemon2.types[0].type.name)
			) {
				setWinner(props.pokemon1);
        console.log('EL ganador es: '+ props.pokemon1);
			//	return props.pokemon1;
			} else if (
				pokemon2DamageTo.find(
					(pokemon2DamageTo) => pokemon2DamageTo.name == pokemon1.types[0].type.name)
			) {
				setWinner(props.pokemon2);
        console.log('EL ganador es: '+ props.pokemon2);
      //  return props.pokemon2;
			} else {
				setWinner("empate");
        console.log('EL ganador es: '+ "empate");
			//	return "Empate";
			}
		}
    console.log('Ganador!!! '+ winner);
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
