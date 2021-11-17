import { useEffect } from "react"

import { useRouter } from "next/dist/client/router"

import { gql, useQuery } from "@apollo/client"

const QUERY_ROOMS = gql`
  query {
    rooms {
      id
      name
      bookings {
        id
      }
    }
  }
`

export const useAuth = () => {
  const { data } = useQuery(QUERY_ROOMS)
  const router = useRouter()

  return {}
}
