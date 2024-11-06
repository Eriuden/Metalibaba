import { combineReducers } from "redux";
import { allArticleReducer } from "./allArticleReducer";
import { allUsersReducer } from "./allUsersReducer";
import { articleReducer } from "./article.Reducer";
import { userReducer } from "./user.reducer";
import { errorReducer } from "./error.reducer";
import { cartReducer } from "./cartReducer"

export const reducers = combineReducers({
    allArticleReducer,
    allUsersReducer,
    articleReducer,
    userReducer,
    errorReducer,
    cartReducer
})