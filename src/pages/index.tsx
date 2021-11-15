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
    try {
      await login()
      // await login({ variables: { name: "paul" } })

      router.push("/")
    } catch (error) {}
  }

  return (
    <Page>
      <h1>Login </h1>
      <button onClick={onLogin}>login</button>
    </Page>
  )
}

export default Login
