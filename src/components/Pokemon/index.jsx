import { useEffect, useState } from 'react';
import './style.css';

function Pokemon(props){

	const [image, setImage] = useState({
		species: {
			url: ''
		},
		sprites:{
			front_default:''
		}
		

	})  

	const [colors, setColors] = useState({
		color:{
			name: 'white'
		}

	})  

	useEffect(()=>{
	  fetch(props.url)
	  .then( async (data) => {
		if(data.ok){
		  const response = await data.json();

		  setImage(response)
		 
		}
		

	  })

	 
	},[props.url])

	useEffect(()=>{
		fetch(image.species.url)
		.then( async (data) => {
		  if(data.ok){
			const response = await data.json();
			  setColors(response)
			  // console.log(ress)
		  }
		})
	},[image])

  return (

		<li  className="pokeItem">
			<h1>{props.name}</h1>
			<div style={{backgroundColor: colors.color.name, color:`#adadad` }} className="containerImg">
				<img 
				src={image.sprites.front_default} 
				alt={props.name}
				/>
			</div>
			
	</li>
	);

}

export default Pokemon;
