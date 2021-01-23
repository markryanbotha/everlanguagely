import { React, Fragment } from "react"
import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

const GET_WORD_BY_ID = gql`
  query getWordById($id: ID!) {
    getWordById(id: $id) {
      id
      word
      translation
      date
      currentFibonnaci
      nextFibonnaci
    }
  }
`

function isNull(myVar) {
  return myVar ? myVar : "Not Specified"
}
export default function WordFullPage(props) {
  const { id } = props.match.params
  const { loading, error, data } = useQuery(GET_WORD_BY_ID, { variables: { id } })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error😢</p>
  console.log(id)
  console.log(data)

  let { word, translation, date, currentFibonnaci, nextFibonnaci } = data.getWordById

  return (
    <Fragment>
      <h1 className="display-4 my-3">Word Details</h1>
      <ul className="list-group">
        <li className="list-group-item">
          ID: <span style={{ color: "#677ea3" }}>{id}</span>
        </li>
        <li className="list-group-item">
          Word: <span style={{ color: "#677ea3" }}>{isNull(word)}</span>
        </li>
        <li className="list-group-item">
          Translation: <span style={{ color: "#677ea3" }}>{isNull(translation)}</span>
        </li>
        <li className="list-group-item">
          Date: <span style={{ color: "#677ea3" }}>{isNull(date)}</span>
        </li>
        <li className="list-group-item">
          currentFibonnaci: <span style={{ color: "#677ea3" }}>{isNull(currentFibonnaci)}</span>
        </li>
        <li className="list-group-item">
          nextFibonnaci: <span style={{ color: "#677ea3" }}>{isNull(nextFibonnaci)}</span>
        </li>
      </ul>
      <hr />
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>
    </Fragment>
  )
}
