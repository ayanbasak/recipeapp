import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import uuid from 'react-uuid'
import { Ingredients } from './Ingredients'
import { setLoaderActive, setLoaderDeactive } from '../../../redux/actions/loader.action';

export const AddRecipe = () => {
    const authorization = useSelector((state) => state.authorization);
    const { isLoading } = useSelector((state) => state.loader);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        image: undefined
    })
   
    const onChange = (e) => {
        setRecipe({...recipe, [e.target.name]: e.target.value})
    }

    const fileUpload = (e) => {
        setRecipe({...recipe, image: e.target.files[0]})
    }

    const [error, setError] = useState({
        name: '',
        description: '',
        image: ''
    })

    const isValid = () => {
        let err = {};

        if(!recipe.name){
            err = {...err, name: "please enter your recipe name"}
            setError(err);
            return false;
        }

        if(!recipe.description){
            err = {...err, description: "please enter your recipe description"}
            setError(err);
            return false;
        }

        if(!recipe.image){
            err = {...err, image: "please provide your recipe image"}
            setError(err);
            return false;
        }

        setError({});
        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(isValid()){
            console.log("recipe  ",recipe)
            console.log("authorization  ",authorization)
            let params = new FormData();
            params.append("image",recipe.image);
            params.append("name",recipe.name);
            params.append("description",recipe.description);
            params.append("user_id", authorization.userId);
            dispatch(setLoaderActive())
            axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/addrecipe", params)
            .then(res => {
                // console.log(res.data)
                dispatch(setLoaderDeactive())
                navigate("/addingredients/"+res.data.id)
            })
            .catch(err => {
                dispatch(setLoaderDeactive())
            })
        }
    }

  return (
    <div>
        <h1>Add New Recipe Details</h1>
        {isLoading ? <p>Loading ...</p> : (
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder='Recipe Name' name="name" value={recipe.name} onChange={onChange}/>
                    {!!error.name && <p className='error-text'>{error.name}</p>}
                </div>
                <div>
                    <input type="text" placeholder='Description' name="description" value={recipe.description} onChange={onChange}/>
                    {!!error.description && <p className='error-text'>{error.description}</p>}
                </div>
                <div>
                    <input type="file" name="image" multiple={false} onChange={fileUpload}/>
                    {!!error.image && <p className='error-text'>{error.image}</p>}
                    <div>{!!recipe.image && <img style={{height: '200px', width:'200px'}} src={URL.createObjectURL(recipe.image)}/>}</div>
                </div>
                <button type="submit">Add Ingredients</button>
            </form>
        )}
    </div>
  )
}
