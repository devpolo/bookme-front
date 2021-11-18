import { Spin } from "antd"

import { Calendar as Cal, dateFnsLocalizer } from "react-big-calendar"

import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"

import { useQueryBookings, useQueryRooms } from "libs"
import { EditBookingModal } from "components/ui"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const Calendar = () => {
  const { data: rooms, loading: loadingRooms } = useQueryRooms()
  const { data: bookings, loading: loadingBookings } = useQueryBookings()

  const onDoubleClickEvent = (e: any) => {
    console.log("onDoubleClickEvent", e)
  }

  const onSelectEvent = (e: any) => {
    console.log("onSelectEvent", e)
  }

  const onSelectSlot = (e: any) => {
    console.log("onSelectSlot", e)
  }

  if (loadingRooms || !rooms || !Array.isArray(rooms.rooms)) return <Spin />
  if (!rooms.rooms.length) return <p>No rooms to display</p>

  if (loadingBookings || !bookings || !Array.isArray(bookings.bookings))
    return <Spin />
  if (!bookings.bookings.length) return <p>No bookings to display</p>

  console.log("bookings:", bookings.bookings)

  return (
    <>
      <EditBookingModal />
      <Cal
        resources={rooms?.rooms}
        selectable
        defaultView='day'
        events={bookings?.bookings}
        localizer={localizer}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        style={{ height: "40vh", width: "80vw" }}
      />
    </>
  )
}

export default Calendar
