import { gql, useQuery } from "@apollo/client"
import { Booking } from "typescript"

const QUERY_BOOKINGS = gql`
  query Bookings {
    bookings {
      id
      roomId
      userId
      title
    }
  }
`

interface IBookingsData {
  bookings: Booking[]
}

export const useQueryBookings = () => {
  return useQuery<IBookingsData>(QUERY_BOOKINGS)
}
