import axios from "axios"
import { Spanish } from "./Util/es.mjs"

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

//below variables are so that I can incrementally add words. After adding a batch, I should make the lastWordsAddedIndex equal the value of 
// cont - addWordsUntilIndex, then make the UntilIndex the next set of words. Max per time has been 300 words

// the values below are set up to go ie can just run it then change the values from then (in future maybe just check incase I forget to do this)
// cont - you can check by going to atlas, then searching for the word that is +1 of the lastWordsAddedIndex, if you can find it then
// cont - try the index + 1 from addWordsUntilIndex (and values around this) to see where I might have left off

// IE to get the search value, go to atlas, type in {"word": <WORD>} where word corresponds to the word for that line that is + 1 from the indices

// it's actually easier to just look at response in graphql playground for the get all words to see what the last added was 

let i = 1
let lastWordsAddedIndex = 1800 //this was the last set of words added - these means that word up to 600 was added (this corresponds to line 601 in the es.mjs file as the first line is a bracket)
let addWordsUntilIndex = 2000 //this is the next index where we want to stop adding words so that we do not overwhelm the api (otherwise we do get errors)
for (const [key, values] of Object.entries(translationObject)) {
  if (i > addWordsUntilIndex) break
  if (i <= lastWordsAddedIndex) {
  } else {
    axios({
      method: "post",
      url: url,
      data: createWordPostRequest(key, values),
    })
  }
  i++
}

//TODO might need to actually add a rank to the word - might have to remove collection and then redo it