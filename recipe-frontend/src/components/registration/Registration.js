import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../redux/actions/authentication.action';

export const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.authorization);
    const [user, setUser] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    })

    const [error, setError] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    })

    console.log("isLoading:  "+isLoading);

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const isValid = () => {
        let err = {};

        if(!user.firstName){
            err = {...err, firstName: "please enter your first name"}
            setError(err);
            return false;
        }

        if(!user.lastName){
            err = {...err, lastName: "please enter your last name"}
            setError(err);
            return false;
        }
        
        if(!user.email){
            err = {...err, email: "please enter your email"}
            setError(err);
            return false;
        }

        if(!user.password){
            err = {...err, password: "please enter your password"}
            setError(err);
            return false;
        }

        if(user.password.length < 6){
            err = {...err, password: "password must be 6 characters long"}
            setError(err);
            return false;
        }

        setError({});
        return true;
    }


    const onSubmit = (e) => {
        e.preventDefault();
        // console.log("Registration", user)
        if(isValid()){
            let data = {
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
                password: user.password,
            }
            dispatch(setLoading(true))
            axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/register", data)
            .then(res => {
                dispatch(setLoading(false))
                if(res.status === 201){
                    // console.log(res.status)
                    navigate("/login");
                }
            })
            .catch(err => {
                dispatch(setLoading(false))
                if(err.response.status === 400){
                    err = {...err, email: "this email is already registered"}
                    setError(err);
                }
            })
        }
    }


  return (
    <div>
        <h1>Registration</h1>
        {isLoading ? <p>Loading...</p> : (
            <form onSubmit={onSubmit}>
            <div>
                <input type="text" placeholder='First Name' name="firstName" value={user.firstName} onChange={onChange}/>
                {!!error.firstName && <p className='error-text'>{error.firstName}</p>}
            </div>
            <div>
                <input type="text" placeholder='Last Name' name="lastName" value={user.lastName} onChange={onChange}/>
                {!!error.lastName && <p className='error-text'>{error.lastName}</p>}
            </div>
            <div>
                <input type="text" placeholder='Email' name="email" value={user.email} onChange={onChange}/>
                {!!error.email && <p className='error-text'>{error.email}</p>}
            </div>
            <div>
                <input type="password" placeholder='Password' name="password" value={user.password} onChange={onChange}/>
                {!!error.password && <p className='error-text'>{error.password}</p>}
            </div>
            <button type="submit">submit</button>
        </form>
        )}
        
    </div>
  )
}
