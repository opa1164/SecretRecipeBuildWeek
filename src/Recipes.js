/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const recipes = [];

app.get('/recipes', (req, resp) => {
	resp.status(200).json(
    recipes.map(({ title, source, ingredients, instructions, category}) => (
      { title, source, ingredients, instructions, category}))
    );
});

app.post('/recipes', (req, resp) => {
	if (req.body.id !== undefined) 
  recipes.push(req.body);
	resp.status(201).json(recipes);
});

app.get('/recipes/title/:search', (req, resp) => {
	const recipeTitle = recipes.filter(recipe => recipe.title.contains(req.params.search)||recipe.category.contains(req.params.search));
	resp.status(200).json(recipeTitle);
});

*/