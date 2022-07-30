import React, { useEffect, useState } from 'react'

export const Ingredients = ({ingredients, removeIngredient, updateIngredient}) => {
    const [ingredient, setIngredient] = useState(ingredients);

    const [error, setError] = useState({
        name: '',
        quantity: '',
        unit: '',
    })

    const onChange = (e) => {
        setIngredient({...ingredient, [e.target.name]: e.target.value})
    }

    const isValid = () => {
        let err = {};

        if(!ingredient.name){
            err = {...err, name: "please enter ingredient name"}
            setError(err);
            return false;
        }

        if(!ingredient.quantity){
            err = {...err, quantity: "please enter ingredient quantity"}
            setError(err);
            return false;
        }

        if(!ingredient.unit){
            err = {...err, unit: "please enter ingredient unit"}
            setError(err);
            return false;
        }

        setError({});
        return true;
    }

    useEffect(()=>{
        if(isValid()){
            // console.log("---useEffect----")
            updateIngredient(ingredient)
        }
    },[ingredient])

  return (
    <div>
        <br />
        <h1>Ingredient</h1>
        <div>
            <input type="text" placeholder='Ingredient Name' name="name" value={ingredient.name} onChange={onChange}/>
            {!!error.name && <p className='error-text'>{error.name}</p>}
        </div>
        <div>
            <input type="text" placeholder='Ingredient Quantity' name="quantity" value={ingredient.quantity} onChange={onChange}/>
            {!!error.quantity && <p className='error-text'>{error.quantity}</p>}
        </div>
        <div>
            <input type="text" placeholder='Ingredient Unit' name="unit" value={ingredient.unit} onChange={onChange}/>
            {!!error.unit && <p className='error-text'>{error.unit}</p>}
        </div>
        <div>
            <button onClick={()=> removeIngredient(ingredient.id)}>Remove</button>
        </div>
        <br />
    </div>
  )
}
