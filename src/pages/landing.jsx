import { useEffect, useState } from 'react';
import Pokemon from '../components/Pokemon';
import '../styles/pages/landing.css'


function Landing(){
  const [dados, setDados] = useState([{}])  
  const [pokeName, setPokeName] = useState('')
  const [pokemons, setPokemons] = useState([{
    name: 'Pokemon',
    url: 'https://pokeapi.co/api/v2/pokemon/1'
  }])

  useEffect(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
    .then( async (data) => {
      if( data.ok){
        const response = await data.json();
         console.log(response.results)
        setDados(response.results)
      }
    })

  },[])

function findPoke(){

  let poke = []
    // eslint-disable-next-line array-callback-return
    dados.map(value => {
    if(value.name.match(pokeName)){
     return poke = value
    }
  })
  setPokemons(poke)
  const div = document.getElementById('pokemonFindByID')
  div.classList.remove('hiden')

}

  return (
    <div id="page-poke">
      <header>
        <h1>Pokemons</h1>
      </header>      

      <div className="findPokemon">
        <div className="gruopButton">
          <input type="text" value={pokeName} onChange={(e)=>{setPokeName(e.target.value)}}/>
          <button onClick={findPoke}> Find </button>
        </div>
        
        <div className="hiden" id="pokemonFindByID" >
          <Pokemon key={`${pokemons.name}_id`} name={pokemons.name} url={pokemons.url}/> 
        </div>
         
      </div>
          
     
      <main className="contentPoke">        
      
          <ul className="contentList">

              {dados.length === 0 && (
                  <p>loadin..</p>
                ) }

                {dados.map((pokemon) => {
                  return <Pokemon key={`${pokemon.name}_id`} name={pokemon.name} url={pokemon.url}/>  
                })}

          </ul>
      </main>
    </div>
  );
}

export default Landing