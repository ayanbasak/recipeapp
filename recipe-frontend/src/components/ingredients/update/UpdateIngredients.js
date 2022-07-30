import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoaderActive, setLoaderDeactive } from '../../../redux/actions/loader.action';

export const UpdateIngredients = () => {
    const { ingredientId } = useParams();
    const { isLoading } = useSelector((state) => state.loader);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ing, setIng] = useState({
        ingredientId: null, 
        name: '', 
        quantity: '', 
        unit: ''
    })

    const [error, setError] = useState({
        name: '',
        quantity: '',
        unit: ''
    })

    const onChange = (e) => {
        setIng({...ing, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        fetchIngredient();
    },[])

    const fetchIngredient = () => {
        dispatch(setLoaderActive())
        axios.get(process.env.REACT_APP_BACKEND_DOMAIN + "/api/ingredient?ingId="+ingredientId)          
            .then(res => {
                dispatch(setLoaderDeactive()) 
                setIng(res.data)
                // navigate("/")               
            })
            .catch(err => {
                dispatch(setLoaderDeactive())
            })
    }

    const isValid = () => {
        let err = {};

        if(!ing.name){
            err = {...err, name: "please enter ingredient name"}
            setError(err);
            return false;
        }

        if(!ing.quantity){
            err = {...err, quantity: "please enter ingredient quantity"}
            setError(err);
            return false;
        }

        if(!ing.unit){
            err = {...err, unit: "please enter unit"}
            setError(err);
            return false;
        }

        setError({});
        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log("ing", ing)

        if(isValid()){
            dispatch(setLoaderActive())
            axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/updateingredient", ing)
            .then(res => {
                dispatch(setLoaderDeactive())
                navigate("/");
            })
            .catch(err => {
                dispatch(setLoaderDeactive())                
            })
        }
    }

  return (
    <div>
        <h1>Update Ingredient</h1>
        {isLoading ? <p>Loading ...</p> : (
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder='Name' name="name" value={ing.name} onChange={onChange}/>
                    {!!error.name && <p className='error-text'>{error.name}</p>}
                </div>
                <div>
                    <input type="text" placeholder='quantity' name="quantity" value={ing.quantity} onChange={onChange}/>
                    {!!error.quantity && <p className='error-text'>{error.quantity}</p>}
                </div>
                <div>
                    <input type="text" placeholder='unit' name="unit" value={ing.unit} onChange={onChange}/>
                    {!!error.unit && <p className='error-text'>{error.unit}</p>}
                </div>
                
                <button type="submit">Update</button>
            </form>
        )}
    </div>
  )
}
