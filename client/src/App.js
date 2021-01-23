import React from "react"
import NotReviewed from "./components/notReviewed"
import WordFullPage from "./components/wordFullPage"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { BrowserRouter as Router, Route } from "react-router-dom"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src="https://img.icons8.com/ios/452/language.png"
            alt="Everlanguagely"
            style={{ height: 100, width: 100, display: "block", margin: "auto" }}
          />
          <Route exact path="/" component={NotReviewed} />
          <Route exact path="/word/:id" component={WordFullPage} />
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
