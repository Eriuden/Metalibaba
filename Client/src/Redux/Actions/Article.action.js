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
        return axios 
            .post(`${process.env.REACT_APP_API_URL}api/article`, data)
            .then((res)=> {
                if (res.data.errors) {
                    dispatch({type: GET_ARTICLE_ERROR, payload: res.data.errors})
                } else {
                    dispatch ({type: GET_ARTICLE_ERROR, payload:""})
                }
            })
    }
}

export const updateArticle = (
    articleId,
    picture,
    name,
    typeArticle,
    groupe,
    price
) => {
    return (dispatch) => {
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/article/${articleId}`,
            data: {picture, name, typeArticle, groupe, price},
        })
        .then(()=> {
            dispatch({
                type: UPDATE_ARTICLE,
                payload: {articleId, picture, name, typeArticle, groupe, price}
            })
        })
        .catch((err)=> window.alert(err))
    }
}

export const deleteArticle = (
    articleId, picture, name, typeArticle, groupe, price
) => {
    return (dispatch) => {
        return axios ({
            method:"delete",
            url:`${process.env.REACT_APP_API_URL}api/article/${articleId}`,
            data: {picture, name, typeArticle, groupe, price}
        })
        .then(()=> {
            dispatch({type: DELETE_ARTICLE, payload: {articleId}})
        })
    }
}

