import { getWordsList } from "most-common-words-by-language"
import { writeFile } from "fs"

const spanishWords = getWordsList("english")

const dict = {}
let i = 1
spanishWords.forEach((element) => {
  dict[element] = element
  i++
})

const json = JSON.stringify(dict)
writeFile("en.json", json, function (err) {
  if (err) {
    return console.error(err)
  }
})
