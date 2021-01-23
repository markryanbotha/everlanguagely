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
  const [search, setSearch] = useState("")
  const [myQuery, setMyQuery] = useState("")

  console.log(data)

  if (loading) {
    return (
      <div class="spinner-grow dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
  }
  if (error) return <p>Error 😭</p>

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const searchFunction = (index) =>
    Object.values(data.getAllWords[index]).join().toLowerCase().includes(myQuery.toLowerCase())

  const getSearch = (e) => {
    e.preventDefault()
    setMyQuery(search)
  }

  //filter before passing to map
  const myData = data.getAllWords.map(({ id, word, translation }, index) =>
    searchFunction(index) ? (
      <div className="card card-body mb-3" key={id}>
        <div className="row">
          <div className="col-md-9">
            <h4>{word}</h4>
            <h4 style={{color: "#677ea3"}}> {translation}</h4>
          </div>
          <div className="col md-3">
            <Link to={`/word/${id}`} className="btn btn-secondary">
              Details
            </Link>
          </div>
        </div>
      </div>
    ) : (
      ""
    )
  )

  return (
    <div>
      <h1 className="display-4 my-3">Everlanguagely</h1>
      <form onSubmit={getSearch} className="form-inline mb-4">
        <input
          className="form-control mr-sm-2"
          style={{ width: "1028px", height: 36 }}
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button class="btn btn-secondary" type="submit">
          Search
        </button>
      </form>
      {myData}
    </div>
  )
}
