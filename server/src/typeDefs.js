import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type Query {
    getAllWords: [Word!]!
  }

  type Word {
    id: ID!
    word: String!
    translation: String!
    date: String!
    currentFibonnaci: Int!
    nextFibonnaci: Int!
  }

  input WordInput {
    word: String!
    translation: String!
    date: String!
    currentFibonnaci: Int!
    nextFibonnaci: Int!
  }

  type Mutation {
    createWord(wordObj: WordInput!): Word!
    deleteWord(id: ID!): Word!
    updateWord(
      id: ID!,
      wordObj: WordInput!
    ): Word!
  }
`
