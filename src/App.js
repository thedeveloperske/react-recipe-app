import { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {

  const APP_ID = "fa230a9f";
  const APP_KEY = "eb536ce8baf3f097a9ad0c3b93bcd6c2";

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes()
  },[query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits)
  }

  const handleSearch = event => {
    setSearch(event.target.value);
    // console.log(search)
  }

  const handleSearchClick = event => {
    event.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <h1>Hello Recipe Application</h1>
      <form className='search-form' onSubmit={handleSearchClick}>
        <input className='search-bar' type='text' onChange={handleSearch}/>
        <button type='submit' className='search-button' value={search}>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  );
}

export default App;
