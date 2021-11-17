import { Calendar as Cal, dateFnsLocalizer, Event } from "react-big-calendar"

import { format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"

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

const resources = [
  {
    id: 1,
    title: "room 1",
  },
  {
    id: 2,
    title: "room 2",
  },
]

const Calendar = () => {
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

  return (
    <Cal
      resources={resources}
      selectable
      defaultView='week'
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
