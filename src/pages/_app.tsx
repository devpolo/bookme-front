import "../styles/globals.css"
import type { AppProps } from "next/app"

import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../libs/apollo/client"

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />{" "}
    </ApolloProvider>
  )
}

export default App
