import type { NextPage } from "next"

import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/dist/client/router"

import Page from "../components/global/Page"

const LoginQuery = gql`
  mutation login($name: String!) {
    login(name: $name) {
      id
      name
    }
  }
`

const Login: NextPage = () => {
  const router = useRouter()
  const [login] = useMutation(LoginQuery)

  const onLogin = async () => {
    const res = await login({ variables: { name: "paul" } })

    console.log(res.data)

    router.push("/")
  }

  return (
    <Page>
      <h1>Login </h1>
      <button onClick={onLogin}>login</button>
    </Page>
  )
}

export default Login
