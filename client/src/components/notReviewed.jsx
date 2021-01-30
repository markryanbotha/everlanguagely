import { React, useState } from "react"
import { WordCards } from "./WordCards"
import { useQuery, gql } from "@apollo/client"

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
  var search = ""
  const { loading, error, data } = useQuery(GET_ALL_WORDS)
  const [myQuery, setMyQuery] = useState("")

  if (loading) {
    return (
      <div className="spinner-grow dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  if (error) return <p>Error 😭</p>

  const getSearch = (e) => {
    e.preventDefault()
    setMyQuery(search)
  }

  const wordsAfterSearch = data.getAllWords.filter(
    (obj) =>
      obj["word"].toLowerCase().includes(myQuery.toLowerCase()) ||
      obj["translation"].toLowerCase().includes(myQuery.toLowerCase())
  )


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
      {wordsAfterSearch.map(({id, word, translation}) => (
          <WordCards key={id} id={id} word={word} translation={translation} />
      ))}
    </div>
  )
}
