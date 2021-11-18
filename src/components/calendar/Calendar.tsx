import { Calendar as Cal, dateFnsLocalizer } from "react-big-calendar"

import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"

import { EditBookingModal } from "components/ui"
import { useState } from "react"
import { Booking, Room } from "typescript"

const locales = { "en-US": enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface ICalendarProps {
  rooms: Room[]
  bookings: Booking[]
}

const Calendar = ({ rooms, bookings }: ICalendarProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [variables, setVariables] = useState<Booking | undefined>(undefined)

  const onDoubleClickEvent = (event: Booking) => {
    setIsModalOpen(true)
    setVariables(event)
  }

  const onSelectSlot = (e: any) => {
    console.log("onSelectSlot", e)
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
