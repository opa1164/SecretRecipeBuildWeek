import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe.js';
import Form from './Form.js';
import RecipeForm from './RecipeForm.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup'
import {Route} from 'react-router-dom'



const initialFormValues = {
  username: '',
  pass: '',
}

const initialFormErrors = {
  username: '',
  pass: '',
}

const initialRecipeValues = {
  title: '',
  source: '',
  ingredients: '',
  instructions: '',
  category: ''
}

const initialRecipeErrors = {
  title: '',
  source: '',
  ingredients: '',
  instructions: '',
  category: ''
}

const formSchema = yup.object().shape({
  username: yup.string()
      .trim()
      .required('Please enter a username'),
  pass: yup.string()
      .required('Please enter a Password'),
});

const recipeSchema = yup.object().shape({
  title: yup.string()
      .trim()
      .required('Please enter a title for your recipe'),
  source: yup.string()
      .required('Please enter a source for your recipe'),
  ingredients: yup.string()
      .required('Please enter the ingredients for your recipe'),
  instructions: yup.string()
      .required('Please enter the instructions for your recipe'),
  category: yup.string()
      .required('Please enter the category of your recipe'),
});


function App() {
  const [user, setUser] = useState(initialFormValues);
  const [recipes, setRecipes] = useState([]);
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [recipeVal, setRecipeVal] = useState(initialRecipeValues);
  const [recipeErr, setRecipeErr] = useState(initialRecipeErrors);
  const [selected, setSelected] = useState();
  const [search, setSearch] = useState('');
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const getRecipes = () => {
    axios.get(`/recipes`)
      .then(res => {
        setRecipes(res.data);
        console.log(recipes);
      })
      .catch(err => {
        console.log(err);
      });
    }
    
    const NewSearch = evt => {
      const { value } = evt.target;
      setSearch(value);
    }

    const postNewRecipe = newRecipe => {
      axios.post('/recipes', newRecipe)
        .then(res => {
          setRecipes([res.data, ...recipes]);
        })
        .catch(err => {
          console.log(err);
          setRecipes(recipes.push(newRecipe));
        })
        setRecipeVal(initialRecipeValues);
        window.location.href = `./recipes`
    }

    const postExistingRecipe = newRecipe => {
      axios.post('/recipes')
        .then(res => {
          setRecipes(recipes.forEach(element =>
            {
              if(element.index == selected)
            {
              element = newRecipe;
            }
          }));
        })
        .catch(err => {
          console.log(err);
        })
        setRecipeVal(initialRecipeValues);
        window.location.href = `./recipes`
    }
    const deleteExistingRecipe = newRecipe => {
      axios.post('/recipes', newRecipe)
        .then(res => {
          setRecipes(recipes.splice(selected, 1));
        })
        .catch(err => {
          console.log(err);
        })
        setRecipeVal(initialRecipeValues);
        window.location.href = `./recipes`
    }

    
    const userChange = (name, value) => {
      yup.reach(formSchema, name)
        .validate(value)
        .then(() => {
          setFormErrors({...formErrors, [name]: ''})
        })
        .catch(err => {
          setFormErrors({...formErrors, [name]: err.errors[0]})
        })
      setFormValues({ ...formValues,[name]: value })
      console.log(formValues);
    }

    const recipeChange = (name, value) => {
      yup.reach(recipeSchema, name)
        .validate(value)
        .then(() => {
          setRecipeErr({...recipeErr, [name]: ''})
        })
        .catch(err => {
          setRecipeErr({...recipeErr, [name]: err.errors[0]})
        })
        setRecipeVal({ ...recipeVal,[name]: value })
      console.log(recipeVal);
    }
    const UserSubmit = () => {
      const newUser = {
        username: formValues.username.trim(),
        pass: formValues.pass.trim()
      }
      setUser(newUser);
      
      window.location.href = `./recipes`
    }
    console.log(user);

    const recipeSubmit = () => {
      const newRecipe = {
        title: recipeVal.title.trim(),
        source: recipeVal.source.trim(),
        ingredients: recipeVal.ingredients.trim(),
        instructions: recipeVal.instructions.trim(),
        category: recipeVal.category.trim()
      }
      postNewRecipe(newRecipe);
    }
    
    useEffect(() => {
      getRecipes();
      console.log(recipes);
    }, recipes)
    
    useEffect(() => {
      setSearchRecipes(recipes.filter( () => recipes.title.contains(search)||recipes.category.contains(search)));
      console.log(recipes);
    }, [search])

  return (
    <div className="App">
      <Route exact path = '/' render ={() =><Form values = {formValues} submit = {UserSubmit} change = {userChange} formSchema = {formSchema} errors = {recipeErr}/>}/>

      <Route path = '/recipes' render ={() => 
      <div>
        <label>Search:
          <input
            value={search}
            onChange={NewSearch}
            name='search'
            type='text'
          />
        </label>
        <button onClick={() =>window.location.href = `./newRecipe`}>New Recipe</button>
      <Recipe recipes = {searchRecipes} selected = {setSelected}/>
      </div>
      }/>
      <Route path = '/newRecipe' render ={() => <RecipeForm values = {recipeVal} submit = {recipeSubmit} change = {recipeChange} formSchema = {recipeSchema} errors = {recipeErr}/>}/>
      <Route path = '/editRecipe' render ={() => 
      <div>
        <RecipeForm values = {recipes[selected]} submit = {postExistingRecipe} change = {recipeChange} formSchema = {recipeSchema} errors = {recipeErr}/>
        <button onClick = {() => {deleteExistingRecipe(); setSelected()}}>Delete Recipe</button>
      </div>
      }/>
    </div>
  );
}

export default App;