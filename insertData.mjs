import axios from "axios"
import { Spanish } from "./es.mjs"

const translationObject = JSON.parse(Spanish)
const createWordPostRequest = (word, translation) =>
  JSON.parse(`{"query":
    "mutation createWord($wordObj: WordInput!){createWord(wordObj:$wordObj){id word translation date currentFibonnaci nextFibonnaci}}",
    "variables": {
    "wordObj": {
      "word": "${word}",
      "translation": "${translation}",
      "date": "2021-01-17",
      "currentFibonnaci": 1,
      "nextFibonnaci": 2
    }
  }
}`)

const url = "http://localhost:4000/graphql"

let i = 0
for (const [key, values] of Object.entries(translationObject)) {
  if (i > 2) break
  axios({
    method: "post",
    url: url,
    data: createWordPostRequest(key, values),
  })
  i++
}

//TODO Create a script to add all of the spanish words to the database.
//TODO I have essentially created an API so I can therefore make requests to it from this script
//TODO Then I can start working on frontend and Put API, so that I can review the words
