import { Spin } from "antd"

import { Calendar as Cal, dateFnsLocalizer, Event } from "react-big-calendar"

import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"
import { useQueryRooms } from "libs"

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
  const { data, loading } = useQueryRooms()

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

  if (loading || !data || !Array.isArray(data.rooms)) return <Spin />
  if (!data.rooms.length) return <p>No rooms to display</p>

  return (
    <Cal
      resources={data?.rooms}
      selectable
      defaultView='day'
      events={events}
      localizer={localizer}
      onDoubleClickEvent={onDoubleClickEvent}
      onSelectEvent={onSelectEvent}
      onSelectSlot={onSelectSlot}
      style={{ height: "40vh", width: "80vw" }}
    />
  )
}

export default Calendar
