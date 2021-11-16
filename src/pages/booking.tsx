import type { NextPage } from "next"

import { Typography, Button } from "antd"

import { useAuth } from "../libs"

import Page from "../components/global/Page"

const { Text, Title, Paragraph } = Typography

const Booking: NextPage = () => {
  const { me, logout } = useAuth()

  return (
    <Page>
      <Title>Booking</Title>
      <Paragraph ellipsis={true}>{JSON.stringify(me, null, 2)}</Paragraph>

      <Button danger onClick={logout}>
        Logout
      </Button>
    </Page>
  )
}

export default Booking
