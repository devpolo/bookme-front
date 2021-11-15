import type { NextPage } from "next"

import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/dist/client/router"

import { useForm } from "react-hook-form"

import Page from "../components/global/Page"

const LoginQuery = gql`
  mutation login($name: String!) {
    login(name: $name) {
      id
      name
    }
  }
`

interface ILoginUser {
  name: string
}

const Login: NextPage = () => {
  const [login] = useMutation(LoginQuery)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (variables: ILoginUser) => {
    console.log(variables)
    try {
      await login({ variables })

      // router.push("/")
    } catch (error) {}
  }

  return (
    <Page>
      <h1>Login </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
        <input type='submit' title='Login' />
      </form>
    </Page>
  )
}

export default Login
