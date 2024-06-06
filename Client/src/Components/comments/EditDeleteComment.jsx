import React, {useEffect, useState, useContext} from 'react'
import { useDispatch } from 'react-redux'
import { deleteCommentArticle, editCommentArticle } from '../../Redux/Actions/Article.action'
import { UidContext } from '../AppContext'

export const EditDeleteComment = ({props, articleId}) => {
    const [isAuthor, setIsAuthor] = useState(false)
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const handleEdit = (e)=> {
        e.preventDefault()

        if (text) {
            dispatch(editCommentArticle(articleId, props._id, text))
            setText("")
            setEdit(false)
        }
    }

    const handleDelete = () => {
        dispatch(deleteCommentArticle(articleId, props._id))
    }

    useEffect(()=> {
        const checkAuthor = () => {
            if (uid === props.commenterId) {
                setIsAuthor(true)
            }
        }
        checkAuthor()
    }, [uid, props._id])


  return (
    <div>
        {isAuthor && edit === false && (
            <span onClick={()=> setEdit(!edit)}>
                Editer
            </span>
        )}
        {isAuthor && edit && (
            <form action='' onSubmit={handleEdit}>
                <label htmlFor='text' onClick={()=> setEdit(!edit)}>
                    Annuler les modifications
                </label>
                <br/>
                <input type="text" name='text' onChange={(e)=> setText(e.target.value)}
                defaultValue={props.text}/>
                <input type="submit" value="Valider les modifications"/>
                <br/>
            </form>
        )}
        {isAuthor && (
            <span onClick={()=> {
                if (window.confirm("Voulez vous supprimer ce commentaire ?")) {
                    handleDelete()
                }
            }}
            >
                Supprimer
            </span>
        )}
    </div>
  )
}
