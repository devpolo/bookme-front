import type { NextPage } from "next"

import { useRouter } from "next/dist/client/router"
import { useForm } from "react-hook-form"

import Page from "components/global/Page"

import { buildUrl, useAuth } from "libs"

const isDev = process.env.ENVIRONMENT === "dev"

interface IInputs {
  name: string
}

const img = buildUrl(
  "v1636994297/consensys/pexels-elizabeth-zernetska-9409789.jpg",
  { transformations: { resize: { width: 1000 } } }
)

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
      <div className='container'>
        <div className='col'>
          <h1>Login </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={isDev ? "paul" : ""}
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
            <input type='submit' title='Login' />
          </form>
        </div>
        <div className='col hide-mobile'>
          <img src={img} alt='meeting room' />
        </div>
      </div>
    </Page>
  )
}

export default Login
