import type { NextPage } from "next"

import { Typography, Space, Button } from "antd"

import { useAuth } from "../libs"
import { Page, Calendar } from "components"

const { Title, Text } = Typography

const Booking: NextPage = () => {
  const { me, logout } = useAuth()

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
        <Calendar />
      </Space>
    </Page>
  )
}

export default Booking
