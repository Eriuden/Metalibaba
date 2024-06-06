import React, {useState} from 'react'
import { addCommentArticle, getArticle } from '../../Redux/Actions/Article.action'
import { useDispatch, useSelector } from 'react-redux'
import { EditDeleteComment } from './EditDeleteComment'
import { isEmpty } from '../../Utils'

export const Comments = ({commentProps}) => {
    const [text, setText] = useState("")
    const user = useSelector((state) => state.userReducer)
    const users = useSelector((state)=> state.allUsersReducer)
    const dispatch = useDispatch()

    const handleComments = (e) => {
        e.preventDefault()

        if (text) {
            dispatch(addCommentArticle(commentProps._id, user._id, text, user.name))
                .then(()=> dispatch(getArticle()))
                .then(()=> setText(""))
        }
    }

  return (
    <div>
        {commentProps.comments.map((comment)=> {
            return (
                <div key={comment._id}>
                    <div>
                        <img src={!isEmpty(users[0]) && users.map((user)=> {
                            if(user._id === comment.commenterId) return user.picture
                            else return null
                        })
                        .join("")
                        }
                        />
                    </div>

                    <div>
                        <h3>{comment.commenterName}</h3>
                    </div>
                    <p>{comment.text}</p>
                    <EditDeleteComment props={comment} 
                    articleId = {commentProps._id}/>
                </div>
            )
        })}

        {user._id && (
            <form action='' onSubmit={handleComments}>
                <input
                type="text"
                name='text'
                onChange={(e)=> setText(e.target.value)}
                value={text}
                placeholder="Laisser un commentaire"
                />
                <br/>
                <input type="submit" value="Envoyer" />
            </form>
            )
        }
    </div>
  )
}
