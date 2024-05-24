import axios from "axios";

export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_PASSWORD = "UPDATE_PASSWORD"
export const DELETE_USER = "DELETE_USER"

export const getUser = (uid) => {
    return (dispatch) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({type: GET_USER, payload: res.data})
            })
            .catch((err) => window.alert(err))
    }
}

export const updateUser = (userId, name, adress, email) => {
    return (dispatch) => {
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/user` + userId,
            data: {name, adress, email}
        })
        .then(()=> {
            dispatch({type: UPDATE_USER, payload: name, adress, email})
        })
    }
}