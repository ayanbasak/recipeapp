import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes, removeOldRecipe, removeRecipeIngredient, setLoading } from "../../redux/actions/recipe.action";

export const Recipes = () => {
  const authorization = useSelector((state) => state.authorization);
  // const [recepies, setRecipes] = useState([])
  const dispatch = useDispatch();
  const { loading, recipes } = useSelector((state) => state.recipes);

  useEffect(()=>{
    fetchRecipes();
  },[])

  const fetchRecipes = () => {
    dispatch(setLoading(true))
    axios.get(process.env.REACT_APP_BACKEND_DOMAIN + "/api/recipes?userId=" + authorization.userId)
    .then(res => {
      dispatch(setRecipes(res.data))
    })
    .catch(err => {
      dispatch(setLoading(false))
    })
  }

  const removeRecipe = (recipeId) => {
    dispatch(setLoading(true))
    axios.delete(process.env.REACT_APP_BACKEND_DOMAIN + "/api/recipe?recipeId="+recipeId)
    .then(res => {
      dispatch(removeOldRecipe(recipeId))
    })
    .catch(err => {
      dispatch(setLoading(false))
    })
  }

  const removeIngredient = (recipeId, ingredientId) => {
    dispatch(setLoading(true))
    axios.delete(process.env.REACT_APP_BACKEND_DOMAIN + "/api/ingredient?ingredientId=" + ingredientId)
    .then(res => {
      dispatch(removeRecipeIngredient({recipeId, ingredientId}))
    })
    .catch(err => {
      dispatch(setLoading(false))
    })
  }

  return (
    <div>
      <h1>Recipes</h1>
      <NavLink to="/add">
        <button>Add Recipe</button>
      </NavLink>
      <div>
      {loading ? <p>Loading ...</p>: recipes.map((rec, i)=>(
        <div key={i}>
          <p>name: {rec.name}</p>
          <p>description: {rec.description}</p>
          <img style={{height: '200px', width:'200px'}} src={process.env.REACT_APP_BACKEND_DOMAIN + rec.image} />
          <div>          
            <button onClick={()=> removeRecipe(rec.id)}>Delete Recipe</button>
            <NavLink to={`/updaterecipe/${rec.id}`}>
              <button>Update Recipe</button>
            </NavLink>
          </div>
          <div>
            {rec.ingredients.map((ing, j)=> (
              <div key={j}>
                <p>ingredient No. {j+1}</p>
                <p>ingredient name: {ing.name}</p>
                <p>ingredient quantity: {ing.quantity}</p>
                <p>ingredient unit: {ing.unit}</p>
                <button onClick={()=> removeIngredient(rec.id, ing.ingredientId)}>Delete Ingredient</button>
                <NavLink to={`/updateingredient/${ing.ingredientId}`}>
                  <button>Update Ingredient</button>
                </NavLink>
                <hr />
              </div>
            ))}
          </div>
          <hr />
        </div>
      ))}
      
      </div>
    </div>
  )
}
