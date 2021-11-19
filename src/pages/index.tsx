import type { NextPage } from "next"

import { useRouter } from "next/dist/client/router"

import { Col, Image, Row, Form, Input, Button, Typography } from "antd"

import { buildUrl, useAuth } from "libs"

import Page from "components/global/Page"

interface IInputs {
  name: string
}

const img = buildUrl(
  "v1636994297/consensys/pexels-elizabeth-zernetska-9409789.jpg",
  { transformations: { resize: { width: 1000 } } }
)

const Login: NextPage = () => {
  const router = useRouter()

  const { login, loading } = useAuth()

  const onFinish = async ({ name }: IInputs) => {
    try {
      await login(name)
      router.push("/booking")
    } catch {}
  }

  return (
    <Page>
      <Row justify='center' align='middle'>
        <Col xs={24} md={12}>
          <div style={{ margin: 100, marginBottom: 200 }}>
            <Typography.Title>Login</Typography.Title>

            <Form
              name='login'
              layout='vertical'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete='off'
            >
              <Form.Item
                label='Name'
                name='name'
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder='Your name' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={0} md={12}>
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
