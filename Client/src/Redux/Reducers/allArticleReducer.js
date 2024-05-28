import { GET_ALL_ARTICLES } from "../Actions/Article.action";

const initialState = {}

export const allArticleReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_ARTICLES:
            return action.payload
        default:
            return state
    }
} 