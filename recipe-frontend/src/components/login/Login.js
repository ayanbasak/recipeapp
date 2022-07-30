import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setLoading } from '../../redux/actions/authentication.action';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.authorization);
    const [user, setUser] = useState({
        email:'',
        password: ''
    })

    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const isValid = () => {
        let err = {};

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

        setError({});
        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log("Login", user)

        if(isValid()){
            let data = {
                email: user.email,
                password: user.password,
            }
            dispatch(setLoading(true))
            axios.post(process.env.REACT_APP_BACKEND_DOMAIN + "/api/login", data)
            .then(res => {
                // console.log(res.data)

                let auth = { 
                    firstname: res.data.firstname, 
                    lastname: res.data.lastname,  
                    userId: res.data.userId,  
                    userEmail: res.data.userEmail,  
                    isAuthenticated: res.data.valid
                }
                dispatch(setIsAuthenticated(auth));

                navigate("/");
            })
            .catch(err => {
                if(err.response.status === 400){
                    err = {email: "please provide valid email and password"}
                    setError(err);
                    dispatch(setLoading(false))
                }
            })
        }
    }

  return (
    <div>
        <h1>Login</h1>
        {isLoading ? <p>Loading...</p> : (
            <form onSubmit={onSubmit}>
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
