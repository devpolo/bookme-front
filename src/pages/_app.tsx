import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

import type { AppProps } from "next/app"

import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../libs/apollo/client"
import { ToastContainer } from "react-toastify"

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <ToastContainer />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
