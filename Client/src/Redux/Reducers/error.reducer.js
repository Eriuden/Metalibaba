import { GET_ARTICLE_ERROR } from "../Actions/Article.action";
import { GET_USER_ERRORS } from "../Actions/User.action";

const initialState = {userError : [], articleError: []}

export const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ARTICLE_ERROR:
            return {
                articleError: action.payload 
            }
        case GET_USER_ERRORS:
            return {
                userError: action.payload
            }
        default: 
            return state
    }
}