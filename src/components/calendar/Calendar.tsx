import { Spin } from "antd"

import { Calendar as Cal, dateFnsLocalizer, Event } from "react-big-calendar"

import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"

import { useQueryBookings, useQueryRooms } from "libs"

interface IEvent extends Event {
  resourceId?: number
}

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

const now = new Date()
const later = now.setHours(now.getHours() + 4)
const events: IEvent[] = [
  {
    title: "1",
    start: now,
    end: new Date(later),
    resourceId: 2,
  },
  {
    title: "2",
    start: now,
    end: new Date(later),
    resourceId: 2,
  },
  {
    title: "3",
    start: now,
    end: new Date(later),
    resourceId: 1,
  },
]

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
  // @ts-ignore
  // const DnDCalendar = withDragAndDrop(Calendar)

  if (loadingRooms || !rooms || !Array.isArray(rooms.rooms)) return <Spin />
  if (!rooms.rooms.length) return <p>No rooms to display</p>

  if (loadingBookings || !bookings || !Array.isArray(bookings.bookings))
    return <Spin />
  if (!bookings.bookings.length) return <p>No bookings to display</p>

  // console.log("data:", data.rooms)

  return (
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
  )
}

export default Calendar
