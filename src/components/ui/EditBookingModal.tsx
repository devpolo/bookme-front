import { Dispatch, SetStateAction } from "react"

import {
  Modal,
  ModalProps,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  InputNumber,
  TreeSelect,
  Switch,
  DatePicker,
} from "antd"
import moment from "moment"

import { Booking } from "typescript"

interface ICalendarProps extends ModalProps {
  variables?: Booking
  setVariables: Dispatch<SetStateAction<Booking | undefined>>
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const Calendar = ({
  variables,
  setVariables,
  setIsModalOpen,
  ...props
}: ICalendarProps) => {
  const onFinish = (values: any) => {
    console.log("values", values)
    setIsModalOpen(false)
    setVariables(undefined)
  }

  return (
    <>
      <Modal title='Edit your booking infos' centered {...props} footer={null}>
        <Form
          name='booking'
          onFinish={onFinish}
          initialValues={{
            title: variables?.title,
            start: moment(variables?.start),
            end: moment(variables?.end),
          }}
        >
          <Form.Item label='title' name='title'>
            <Input />
          </Form.Item>
          <Form.Item label='start' name='start'>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label='end' name='end'>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Calendar
