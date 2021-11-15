import type { NextPage } from "next"

import Head from "next/head"

import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/dist/client/router"

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
    <div>
      <h1>Login </h1>
      <button onClick={onLogin}>login</button>
    </div>
  )
}

export default Login
