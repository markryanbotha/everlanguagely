import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Translation = styled.h1`
  color: #677ea3;
  visibility: ${(props) => (props.isTranslated ? "visible" : "collapse")};
`

export const WordCards = ({ id, word, translation }) => {
  const [isTranslated, setIsTranslated] = useState(false)

  const handleCardClick = (e, id) => {
    e.preventDefault()
    setIsTranslated(!isTranslated)
  }

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9" onClick={handleCardClick}>
          <h1>{word}</h1>
          <Translation isTranslated={isTranslated}>{translation}</Translation>
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
