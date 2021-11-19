import { Layout, Typography, Button, Avatar, Space, Popover } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"

import { useAuth } from "libs"

import { Colors } from "../../constants"

interface IHeaderProps {
  title?: string
}

const Header = ({ title }: IHeaderProps) => {
  const { me, logout } = useAuth()

  const content = (
    <div>
      <p style={{ color: Colors.grey }}>
        User id: <b>{me.id}</b>
      </p>
      <Button danger onClick={logout} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </div>
  )

  return (
    <Layout.Header
      style={{
        width: "100vW",
        paddingTop: 10,
        marginBottom: 30,
        paddingBottom: 10,
        background: Colors.lightGrey,
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      {title && (
        <Typography.Title style={{ margin: 0 }}>{title || ""}</Typography.Title>
      )}
      <Popover
        content={content}
        title={`Hi, ${me.name}!`}
        placement='bottomRight'
      >
        <Avatar size={40} icon={<UserOutlined />} />
      </Popover>

      <Space></Space>
    </Layout.Header>
  )
}

export default Header
