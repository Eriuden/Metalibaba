import axios from "axios";

export const GET_ARTICLE = "GET_ARTICLE"
export const GET_ALL_ARTICLES = "GET_ALL_ARTICLES"
export const GET_ARTICLE_ERROR = "GET_ARTICLE_ERROR"
export const ADD_ARTICLE = "ADD_ARTICLE"
export const UPDATE_ARTICLE = "UPDATE_ARTICLE"
export const DELETE_ARTICLE = "DELETE_ARTICLE"

export const getAllArticles = () => {
    return (dispatch) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/article`)
            .then((res)=> {
                dispatch({type:GET_ALL_ARTICLES, payload: res.data})
            })
            .catch((err) => window.alert(err))
    }
}

export const getArticle = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/article/:id`)
            .then((res)=> {
                dispatch({type:GET_ARTICLE, payload:res.data})
            })
            .catch((err)=> window.alert(err))
    }
}

export const addArticle = (data) => {
    return (dispatch) => {
        
    }
}