import { useMemo } from "react"

import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error"

import { toast } from "react-toastify"
import merge from "deepmerge"

let apolloClient: any

function createIsomorphLink() {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema")
    const { schema } = require("./schema")
    return new SchemaLink({ schema })
  } else {
    const { HttpLink } = require("@apollo/client/link/http")
    return new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      // credentials: "same-origin",
    })
  }
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      console.log(`[GraphQL error]: Message: ${message} Path: ${path}`)
      message && toast.error(message, { hideProgressBar: true })
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    networkError?.message &&
      toast.error(networkError.message, { hideProgressBar: true })
  }
})

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([errorLink, createIsomorphLink()]),
    cache: new InMemoryCache({
      typePolicies: {
        Booking: {
          fields: {
            resourceId: {
              read: (_, { readField }) => {
                return readField("roomId")
              },
            },
            end: {
              read: (existing) => {
                return new Date(existing)
              },
            },
            start: {
              read: (existing) => {
                return new Date(existing)
              },
            },
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any) {
  return useMemo(() => initializeApollo(initialState), [initialState])
}
