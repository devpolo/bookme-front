import { Spin } from "antd"

import { Calendar as Cal, dateFnsLocalizer } from "react-big-calendar"

import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"

import { useQueryBookings, useQueryRooms } from "libs"
import { EditBookingModal } from "components/ui"
import { useState } from "react"
import { Booking } from "typescript"

const locales = { "en-US": enUS }

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [variables, setVariables] = useState<Booking | undefined>(undefined)

  const onDoubleClickEvent = (event: Booking) => {
    setIsModalOpen(true)
    setVariables(event)
  }

  const onSelectSlot = (e: any) => {
    console.log("onSelectSlot", e)
  }

  if (loadingRooms || !rooms || !Array.isArray(rooms.rooms)) return <Spin />
  if (!rooms.rooms.length) return <p>No rooms to display</p>

  if (loadingBookings || !bookings || !Array.isArray(bookings.bookings))
    return <Spin />
  if (!bookings.bookings.length) return <p>No bookings to display</p>

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
        resources={rooms?.rooms}
        selectable
        defaultView='day'
        events={bookings?.bookings}
        localizer={localizer}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectSlot={onSelectSlot}
        style={{ height: "40vh", width: "80vw" }}
      />
    </>
  )
}

export default Calendar
