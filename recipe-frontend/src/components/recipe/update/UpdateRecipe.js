import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderActive, setLoaderDeactive } from '../../../redux/actions/loader.action';

export const UpdateRecipe = () => {
  const { recipeId } = useParams();
  const { isLoading } = useSelector((state) => state.loader);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState({
    id: null, 
    userId: null, 
    name: '', 
    description: '', 
    image: ''
  })
  const [error, setError] = useState({
    name: '',
    description: ''
  })

  const [img, setImg] = useState(null)

  useEffect(()=>{
    fetchRecipe();
  },[])

  const fetchRecipe = () => {
    dispatch(setLoaderActive())
    axios.get(process.env.REACT_APP_BACKEND_DOMAIN + "/api/recipe?recipeId="+recipeId)          
    .then(res => {
        // console.log(res.data) 
        dispatch(setLoaderDeactive())
        setRecipe(res.data)
        // navigate("/")               
    })
    .catch(err => {
      dispatch(setLoaderDeactive())
    })
  }

  const isValid = () => {
    let err = {};

    if(!recipe.name){
        err = {...err, name: "please enter recipe name"}
        setError(err);
        return false;
    }

    if(!recipe.description){
        err = {...err, description: "please enter recipe description"}
        setError(err);
        return false;
    }

    setError({});
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("recipe", recipe)

    if(isValid()){
      let params = new FormData();
      params.append("name", recipe.name);
      params.append("id", recipe.id);
      params.append("user_id", recipe.userId);
      params.append("description",recipe.description);
      if(!!img){
        params.append("image", img);
      }

      dispatch(setLoaderActive())
      axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/updaterecipe", params)
      .then(res => {
          dispatch(setLoaderDeactive())
          navigate("/");
      })
      .catch(err => {
        dispatch(setLoaderDeactive())
      })
    }
  }

  const onChange = (e) => {
    setRecipe({...recipe, [e.target.name]: e.target.value})
  }

  const fileUpload = (e) => {
    setImg(e.target.files[0])
  }

  return (
    <div>    
        <h1>Update Recipe</h1>
        {isLoading ? <p>Loading ...</p> : (
          <form onSubmit={onSubmit}>
            <div>
                <input type="text" placeholder='Name' name="name" value={recipe.name} onChange={onChange}/>
                {!!error.name && <p className='error-text'>{error.name}</p>}
            </div>
            <div>
                <input type="text" placeholder='description' name="description" value={recipe.description} onChange={onChange}/>
                {!!error.description && <p className='error-text'>{error.description}</p>}
            </div>
            <div>
              <div>
                {!!img ? <img src={URL.createObjectURL(img)} /> : <img src={process.env.REACT_APP_BACKEND_DOMAIN + recipe.image}/>}
              </div>
              <div>
                <input type="file" name="image" multiple={false} onChange={fileUpload}/>
              </div>
            </div>
            
            <button type="submit">Update</button>
          </form>
        )}       
    </div>
  )
}
