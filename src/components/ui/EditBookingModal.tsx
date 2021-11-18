import { Modal, Spin } from "antd"
import { useState } from "react"

const Calendar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const onOk = (e: any) => {
    console.log("onOk", e)
  }

  const onCancel = (e: any) => {
    console.log("onCancel", e)
  }

  return (
    <>
      <Modal
        title='Vertically centered modal dialog'
        centered
        visible={isVisible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <p>some contents...</p>
      </Modal>
    </>
  )
}

export default Calendar
