import { Dispatch, SetStateAction } from "react"

import { Modal, ModalProps, Form, Input, Button, DatePicker } from "antd"

import moment from "moment"

import { Booking } from "typescript"
import { useMutation, gql } from "@apollo/client"

const EDIT_BOOKING_MUTATION = gql`
  mutation updateBooking(
    $title: String
    $start: DateTime
    $end: DateTime
    $roomId: Float
    $userId: Float!
    $id: Float!
  ) {
    updateBooking(
      title: $title
      start: $start
      end: $end
      roomId: $roomId
      userId: $userId
      id: $id
    ) {
      id
      roomId
      userId
      title
      end
      start
      resourceId @client
    }
  }
`

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
  const [updateBooking] = useMutation(EDIT_BOOKING_MUTATION)

  const onFinish = async (values: any) => {
    console.log("values", values)
    await updateBooking({ variables: values })
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
