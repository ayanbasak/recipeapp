import { SET_AUTHENTICATION, SET_FORM_LOADING } from "../types/authentication.types";

export const setIsAuthenticated = (authenticationData) => ({
  type: SET_AUTHENTICATION,
  authenticationData,
});

export const setLoading = (isLoading) => ({
  type: SET_FORM_LOADING,
  isLoading
});