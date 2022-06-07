import "../styles/Pokemon.css";

function Pokemon({ name, pokemon, win}) {
  return (
    <div className={`pokemon-contenedor ${win? 'winner' :  ''}`.trimEnd()}>
      <p className="pokemon-name">
        <strong>{win? 'El Ganador es ':''}</strong>
        <strong>{name}</strong>
      </p>
      <img
        className='pokemon-img'
        src={pokemon.sprites.other.dream_world.front_default}
        id={name}
        alt={name}
      />
    </div>
  );
}

export default Pokemon;
