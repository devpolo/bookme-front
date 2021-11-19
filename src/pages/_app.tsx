import "../styles/globals.css"
import "antd/dist/antd.css"
import "react-toastify/dist/ReactToastify.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"

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
