import "../styles/Pokemon.css";

function Pokemon({ pokemon, isWinner }) {
  return (
    <div className={`pokemon-contenedor ${isWinner ? "winner" : ""}`.trimEnd()}>
      <p className="pokemon-name">
        <strong>{isWinner ? "The winner is " : ""}</strong>
        <strong>{pokemon.name}</strong>
      </p>
      <img
        className="pokemon-img"
        src={pokemon.sprites.other.dream_world.front_default}
        id={pokemon.name}
        alt={pokemon.name}
      />
    </div>
  );
}

export default Pokemon;
