import type { NextPage } from "next"

import { Typography, Space, Button } from "antd"

import ReactJson from "react-json-view"

import { useAuth } from "../libs"

import Page from "../components/global/Page"

const { Title } = Typography

const Booking: NextPage = () => {
  const { me, logout } = useAuth()

  return (
    <Page>
      <Space direction='vertical' size='large' style={{ margin: 100 }}>
        <Title>Booking</Title>

        <ReactJson src={me} />
        <Button danger onClick={logout}>
          Logout
        </Button>
      </Space>
    </Page>
  )
}

export default Booking
