import { gql, useQuery } from "@apollo/client"
import { Room } from "typescript"

export const QUERY_ROOMS = gql`
  query Rooms {
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
