import type { NextPage } from "next"

import { Typography, Space, Button, Spin } from "antd"

import { useAuth, useQueryBookings, useQueryRooms } from "libs"
import { Page, Calendar } from "components"

const { Title, Text } = Typography

const Booking: NextPage = () => {
  const { me, logout } = useAuth()
  const { data: rooms, loading: loadingRooms } = useQueryRooms()
  const { data: bookings, loading: loadingBookings } = useQueryBookings()

  if (loadingRooms || !rooms || !Array.isArray(rooms.rooms)) return <Spin />
  if (!rooms.rooms.length) return <p>No rooms to display</p>

  if (loadingBookings || !bookings || !Array.isArray(bookings.bookings))
    return <Spin />

  return (
    <Page>
      <Space direction='vertical' size='large' style={{ margin: 100 }}>
        <Title>Booking</Title>
        <Text>
          {/* @ts-ignore */}
          Hello <b>{me.name}</b>. Your id is: <b>{me.id}</b>.
        </Text>
        <Button danger onClick={logout}>
          Logout
        </Button>
        <Calendar
          rooms={rooms?.rooms || []}
          bookings={bookings?.bookings || []}
        />
      </Space>
    </Page>
  )
}

export default Booking
