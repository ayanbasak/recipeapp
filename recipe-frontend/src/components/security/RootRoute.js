import React from 'react'
import { useSelector } from "react-redux";
import { Home } from '../home/Home';
import { Recipes } from '../recipe/Recipes';

export const RootRoute = () => {
    const authorization = useSelector((state) => state.authorization);

    if(!authorization.isAuthenticated){
        return <Home />
    }else{
        return <Recipes />
    }
}
