import type { NextPage } from "next"

import { Space } from "antd"

import { useQueryBookings, useQueryRooms } from "libs"
import { Page, Calendar, Header } from "components"

const Booking: NextPage = () => {
  const { data: rooms, loading: loadingRooms } = useQueryRooms()
  const { data: bookings } = useQueryBookings()

  return (
    <Page>
      <Header title='Cola Day' />
      <Space
        direction='vertical'
        size='large'
        style={{ marginLeft: 50, marginRight: 50 }}
      >
        <Calendar
          loading={loadingRooms || !rooms || !Array.isArray(rooms.rooms)}
          rooms={rooms?.rooms || []}
          bookings={bookings?.bookings || []}
        />
      </Space>
    </Page>
  )
}

export default Booking
