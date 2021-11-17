import { gql, useQuery } from "@apollo/client"
import { Query, Room } from "typescript"

const QUERY_ROOMS = gql`
  query {
    rooms {
      id
      title
      bookings {
        id
      }
    }
  }
`

interface IRoomsData {
  rooms: Room[]
}

export const useQueryRooms = () => {
  return useQuery<IRoomsData>(QUERY_ROOMS)
}
