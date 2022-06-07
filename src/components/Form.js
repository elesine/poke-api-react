import React, { useState } from "react";
import "../styles/Form.css";

function Form( {setPokemonName} ) {
  const [input, setInput] = useState("");
//  const [submittedInput, setSubmittedInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("You have submitted name pokemon");
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <button className="button-input" type="submit" onClick={()=>setPokemonName(input)}>Add pokemon</button>
    </form>
  );
}

export default Form;