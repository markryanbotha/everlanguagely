import React, { useState } from "react"
import { Link } from "react-router-dom"

export const WordCards = ({ id, word, translation }) => {
  const [isTranslated, setIsTranslated] = useState(false)

  const handleCardClick = (e, id) => {
    e.preventDefault()
    setIsTranslated(!isTranslated)
  }

  const translationStyle = (id) => ({
    color: "#677ea3",
    visibility: isTranslated === true ? "visible" : "collapse",
  })

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9" onClick={handleCardClick}>
          <h1>{word}</h1>
          <h1 style={translationStyle()}> {translation}</h1>
        </div>
        <div className="col md-3">
          <Link to={`/word/${id}`} className="btn btn-secondary float-right">
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

//export default memo(WordCards)
