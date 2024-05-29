import {GET_ARTICLE, UPDATE_ARTICLE, UPLOAD_ARTICLE_PICTURE, DELETE_ARTICLE,
 LIKE_ARTICLE, UNLIKE_ARTICLE, DISLIKE_ARTICLE, UNDISLIKE_ARTICLE,
 ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT} 
from "../Actions/Article.action";

const initialState = {}

export const articleReducer = (state = initialState, action ) => {
    switch(action.type) {
        case GET_ARTICLE:
            return action.payload
        case UPDATE_ARTICLE:
            return state.map((article) => {
                if (article.id === action.payload.articleId) {
                    return {
                        ...article,
                        name: action.payload.name,
                        typeArticle: action.payload.typeArticle,
                        groupe: action.payload.groupe,
                        price: action.payload.price
                    }
                } else return article
            })
    }
}