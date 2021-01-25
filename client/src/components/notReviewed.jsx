import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { React, useState } from "react"

const GET_ALL_WORDS = gql`
  query {
    getAllWords {
      id
      word
      translation
      date
      currentFibonnaci
      nextFibonnaci
    }
  }
`

export default function NotReviewed() {
  const { loading, error, data } = useQuery(GET_ALL_WORDS)
  var search = ""
  const [myQuery, setMyQuery] = useState("")
  const [isTranslated, setIsTranslated] = useState({})

  if (loading) {
    return (
      <div className="spinner-grow dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  if (error) return <p>Error 😭</p>

  const wordsAfterSearch = data.getAllWords.filter(
    (obj) =>
      obj["word"].toLowerCase().includes(myQuery.toLowerCase()) ||
      obj["translation"].toLowerCase().includes(myQuery.toLowerCase())
  )

  const getSearch = (e) => {
    e.preventDefault()
    setMyQuery(search)
  }

  const handleCardClick = (e, id) => {
    e.preventDefault()
    if (isTranslated[id] === true) {
      setIsTranslated({ ...isTranslated, [id]: false })
    } else {
      setIsTranslated({ ...isTranslated, [id]: true })
    }
  }


  const translationStyle = (id) => ({
    color: "#677ea3",
    visibility: isTranslated[id] === true ? "visible" : "collapse",
  })

  //filter before passing to map
  const myData = wordsAfterSearch.map(({ id, word, translation }) => (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9" onClick={(e) => handleCardClick(e, id)}>
          <h1>{word}</h1>
          <h1 style={translationStyle(id)}> {translation}</h1>
        </div>
        <div className="col md-3">
          <Link to={`/word/${id}`} className="btn btn-secondary float-right">
            Details
          </Link>
        </div>
      </div>
    </div>
  ))

  return (
    <div>
      <h1 className="display-4 my-3">Everlanguagely</h1>
      <form onSubmit={(e) => getSearch(e)} className="form-inline mb-4">
        <input
          className="col-auto"
          style={{ width: "1028px", height: 36 }}
          type="text"
          onChange={(e) => (search = e.target.value)}
        />
        <button className="btn btn-secondary" type="submit">
          Search
        </button>
      </form>
      {myData}
    </div>
  )
}
