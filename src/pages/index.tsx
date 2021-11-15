import type { NextPage } from "next"

import { useRouter } from "next/dist/client/router"
import { useForm } from "react-hook-form"
import { Col, Image, Row } from "antd"

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
      <Row>
        <Col span={12}>
          <h1>Login </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={isDev ? "paul" : ""}
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
            <input type='submit' title='Login' />
          </form>
        </Col>
        <Col span={12}>
          <Image
            preview={false}
            src={img}
            style={{ height: "100vh", width: "50vw", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Page>
  )
}

export default Login
