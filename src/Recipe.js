import logo from './logo.svg';
import './App.css';
import React from 'react'


function Recipe(props) {
  const{recipes, selected} = props;
  
  
  return (
    <div>
    {recipes.map( (recipe, id) => (
    <div id = {id} onClick={() =>{window.location.href = `./editRecipe`; selected(id)}}>
      <h2>{recipe[id].title}</h2>
      <h3>{recipe[id].source}</h3>
      <p>{recipe[id].ingredients}</p>
      <p>{recipe[id].ingredients}</p>
      <p>{recipe[id].category}</p>
    </div>
    ))}
    </div>
  );
}

export default Recipe;
