import { SET_LOADER_ACTIVE, SET_LOADER_DEACTIVE } from "../types/loader.types";

export const setLoaderActive = () => ({
    type: SET_LOADER_ACTIVE
});

export const setLoaderDeactive = () => ({
    type: SET_LOADER_DEACTIVE
});