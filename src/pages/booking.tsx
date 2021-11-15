import type { NextPage } from "next"

import Page from "../components/global/Page"
import { useAuth } from "../libs"

const Booking: NextPage = () => {
  const { me, logout } = useAuth()

  const onclick = () => {
    console.log(me)
  }

  return (
    <Page>
      <h1>Booking</h1>
      <button onClick={onclick}>press</button>
      <button onClick={logout}>Logout</button>
    </Page>
  )
}

export default Booking
