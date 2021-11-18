import { Calendar as Cal, dateFnsLocalizer, SlotInfo } from "react-big-calendar"

import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"
import { gql, useMutation } from "@apollo/client"

import { EditBookingModal } from "components/ui"
import { useState } from "react"
import { Booking, Room } from "typescript"
import { QUERY_BOOKINGS, useAuth } from "libs"

const locales = { "en-US": enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export const CREATE_BOOKING_MUTATION = gql`
  mutation createBooking(
    $title: String!
    $start: DateTime!
    $end: DateTime!
    $roomId: Float!
    $userId: Float!
  ) {
    createBooking(
      createBookingInput: {
        title: $title
        start: $start
        end: $end
        roomId: $roomId
        userId: $userId
      }
    ) {
      id
      roomId
      userId
      title
      start
      end
    }
  }
`

interface ICalendarProps {
  rooms: Room[]
  bookings: Booking[]
}

const Calendar = ({ rooms, bookings }: ICalendarProps) => {
  const { me } = useAuth()
  const [createBooking] = useMutation(CREATE_BOOKING_MUTATION, {
    refetchQueries: [{ query: QUERY_BOOKINGS }],
  })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [variables, setVariables] = useState<Booking | undefined>(undefined)

  const onDoubleClickEvent = (event: Booking) => {
    setIsModalOpen(true)
    setVariables(event)
  }

  const onSelectSlot = async (event: SlotInfo) => {
    await createBooking({
      variables: {
        // @ts-ignore
        roomId: event.resourceId,
        userId: me.id,
        title: `${me.name}'s meeting`,
        end: event.end,
        start: event.start,
      },
    })
  }

  return (
    <>
      <EditBookingModal
        variables={variables}
        setVariables={setVariables}
        visible={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onCancel={() => setIsModalOpen(false)}
      />
      <Cal
        views={["day", "week"]}
        resources={rooms}
        selectable
        defaultView='day'
        events={bookings}
        localizer={localizer}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectSlot={onSelectSlot}
        style={{ height: "40vh", width: "80vw" }}
      />
    </>
  )
}

export default Calendar
