import React, { useState } from "react";
import "../styles/PokemonInput.css";

function Form({ setPokemonName }) {
  const [input, setInput] = useState("");

  return (
    <div className="form">
      <div className="form-control">
        <input
          className="input"
          type="text"
          id={input}
          name={input}
          value={input}
          placeholder="Pokemon Name"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button
        className="button-input"
        type="submit"
        onClick={() => setPokemonName(input)}
      >
        Add pokemon
      </button>
    </div>
  );
}

export default Form;
