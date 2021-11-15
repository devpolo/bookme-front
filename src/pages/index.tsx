import type { NextPage } from "next"

import { useRouter } from "next/dist/client/router"
import { useForm } from "react-hook-form"

import Page from "../components/global/Page"
import { useAuth } from "../libs"

const isDev = process.env.ENVIRONMENT === "dev"

interface IInputs {
  name: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { login } = useAuth()

  const onSubmit = async ({ name }: IInputs) => {
    try {
      await login(name)
      router.push("/booking")
    } catch {}
  }

  return (
    <Page>
      <h1>Login </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={isDev ? "paul" : ""}
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <input type='submit' title='Login' />
      </form>
      {/* <button onClick={getMe}>get me</button> */}
    </Page>
  )
}

export default Login
