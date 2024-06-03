import { combineReducers } from "redux";
import { allArticleReducer } from "./AllArticleReducer";
import { allUsersReducer } from "./AllUsersReducer";
import { articleReducer } from "./Article.Reducer";
import { userReducer } from "./User.reducer";
import { errorReducer } from "./error.reducer";

export const reducers = combineReducers({
    allArticleReducer,
    allUsersReducer,
    articleReducer,
    userReducer,
    errorReducer
})