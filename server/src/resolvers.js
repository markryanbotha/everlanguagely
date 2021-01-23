import { Word } from "./models/word"
import { ObjectID } from "mongodb"

export const resolvers = {
  Query: {
    getAllWords: () => Word.find(),
    getWordById: (_, { id }) => {
      return Word.findOne({
        _id: new ObjectID(id),
      })
    },
  },
  Mutation: {
    createWord: (_, { wordObj }) => {
      const dbWord = new Word(wordObj)
      return dbWord.save()
    },

    deleteWord: async (_, { id }) => {
      const deletedWord = await Word.findOne({
        _id: new ObjectID(id),
      })
      await Word.deleteOne({
        _id: new ObjectID(id),
      })

      return deletedWord
    },

    updateWord: async (_, { id, wordObj }) => {
      await Word.updateOne(
        { _id: new ObjectID(id) },
        { $set: wordObj }
      )

      const updatedWord = await Word.findOne({
        _id: new ObjectID(id),
      })

      return updatedWord
    },
  },
}
