import { Word } from "./models/word"
import { ObjectID } from "mongodb"

export const resolvers = {
  Query: {
    getAllWords: () => Word.find(),
  },
  Mutation: {
    createWord: (_, { wordObj }) => {
      const dbWord = new Word(wordObj)
      return dbWord.save()
    },
    deleteWord: async (_, { id }) => {
      return await Word.findOneAndDelete({
        _id: new ObjectID(id),
      })
    },
  },
}
