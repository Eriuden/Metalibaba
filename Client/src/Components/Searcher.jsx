import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles } from '../Redux/Actions/Article.action'
import { ArticleCard } from './ArticleCard'

export const Searcher = () => {

  const [search, setSearch] = useState("")
  const articles = useSelector((state) => state.allArticleReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllArticles)
  }, [search])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)

    const result = articles.filter((article)=> article.name.toLowerCase()
    .includes(search.toLowerCase()) || article.groupe.toLowerCase()
    .includes(search.toLowerCase()) || article.typeArticle.toLowerCase().includes(
    search.toLowerCase))
    
    setSearch(result)
  }

  return (
    <div className='mt-8 flex justify-center'>
      <form action='' className='border rounded-md my-4 max-w-[100%]'>
        <input type="text" placeholder="Nom d'article, type ou groupe"
        onChange={handleSearchChange} value={search}/>
      </form>

      <div>
        {search ? (
          articles.map((article) => {
            if (article.name.includes(search)){
              <ArticleCard articleProps={article} key={article._id}/>
            }
          })
        ): ""}
      </div>
    </div>
  )
}
