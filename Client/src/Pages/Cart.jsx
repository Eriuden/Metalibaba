import React from 'react'
import { useSelector } from 'react-redux'

export const Cart = () => {
  
    const cartData = useSelector((state)=> state.cartReducer)

  return (
    <div>
        <div>
            {cartData.map((article)=> {
                <>
                    <div>
                        <h2>{article.name}</h2>
                        <img src={article.picture}/>
                        <h3>{article.typeArticle}</h3>
                        <h3>{article.groupe}</h3>
                        <h3>{article.price}</h3>
                    </div>
                </>           
            })}
        </div>

        <div>
            <span>{cartData.totalPrice}</span>
        </div>
        
    </div>
  )
}
