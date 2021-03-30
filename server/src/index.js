import express from "express"
import mongooose from "mongoose"
import { ApolloServer } from "apollo-server-express"
import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolvers"
require("dotenv").config()

const startServer = async () => {
  const app = express()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await mongooose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    )
  )
}

startServer()
