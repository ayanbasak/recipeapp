import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Registration } from "./components/registration/Registration";
import { Recipes } from "./components/recipe/Recipes";
import { AddRecipe } from "./components/recipe/add/AddRecipe";
import { UpdateRecipe } from "./components/recipe/update/UpdateRecipe";
import PrivateRoutes from "./components/security/PrivateRoutes";
import { RootRoute } from "./components/security/RootRoute";
import { AddIngredients } from "./components/ingredients/add/AddIngredients";
import { UpdateIngredients } from "./components/ingredients/update/UpdateIngredients";

function App() {
  return (
    <Router> 
        <Routes>     
          <Route element={<PrivateRoutes />}>
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/addingredients/:recipeId" element={<AddIngredients />} />
            <Route path="/updaterecipe/:recipeId" element={<UpdateRecipe />} />
            <Route path="/updateingredient/:ingredientId" element={<UpdateIngredients />} />
          </Route>
          
          <Route path="/" element={<RootRoute />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
  );
}

export default App;

/***
 
<Route element={<PrivateRoutes />}>
            <Route path="/" element={<Recipes />} />
            <Route path="/add" element={<AddRecipe />} />
            <Route path="/update" element={<UpdateRecipe />} />
          </Route>
  
 
 */