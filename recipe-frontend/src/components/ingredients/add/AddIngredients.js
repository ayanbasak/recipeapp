import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Ingredients } from '../../recipe/add/Ingredients';
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setLoaderActive, setLoaderDeactive } from '../../../redux/actions/loader.action';

export const AddIngredients = () => {
    const [ingredients, setIngredients] = useState([])
    const { recipeId } = useParams();
    const { isLoading } = useSelector((state) => state.loader);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log("recipeId:  ",recipeId);


    const onSubmit = () => {
        // e.preventDefault();
        let isIngrediantsValid = ingredients.every(ing => !!ing.name && !!ing.quantity && !!ing.unit) 
        // console.log("isIngrediantsValid  ",isIngrediantsValid)
        if(isIngrediantsValid){ 
            let _ingrediants = ingredients.map(ing => {
                return {
                    name: ing.name,
                    quantity: "" + ing.quantity,
                    unit: ing.unit
                }
            })

            // console.log("_ingrediants:   ",_ingrediants)

            let _data = {
                recipeId: parseInt(recipeId),
                ingredients: _ingrediants
            }

            dispatch(setLoaderActive())
            axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/addingredients", _data)          
            .then(res => {
                dispatch(setLoaderDeactive())
                navigate("/")               
            })
            .catch(err => {
                dispatch(setLoaderDeactive())
            })
        }
        
    }

    const updateIngredient = (data) => {
        // let ings = ingredients.filter(ing => ing.id !== data.id)
        // console.log("--------updateIngredient-----------")
        let ings = []
        ingredients.forEach(ing => {
            if(ing.id === data.id){
                ings = [...ings, data]
            }else{
                ings = [...ings, ing]
            }
        })
        setIngredients(ings);
    }

    const addIngredient = () => {
        setIngredients([...ingredients, {
            id: uuid(),
            name: '',
            quantity: 1,
            unit: ''
        }])
    }

    const removeIngredient = (id) => {
        setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  return (
    <div>
        <h1>Add Recipe Ingredients</h1>    
        {isLoading ? <p>Loading ...</p> : (
        <div>
            <div>
                {ingredients.map((ing, i)=> (
                    <Ingredients key={i} ingredients={ing} removeIngredient={removeIngredient} updateIngredient={updateIngredient}/>
                ))}
                <button onClick={addIngredient}>Add Ingredient</button>
            </div>   
            
            <button onClick={onSubmit}>Save</button>
        </div>
        )}       
    </div>
  )
}

// http://localhost:8080/api/recipe/image/42b91e39-f6da-407f-ae23-42aa21bc0eda.jpg