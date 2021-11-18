import { Dispatch, SetStateAction } from "react"

import { Modal, ModalProps, Form, Input, Button, DatePicker } from "antd"

import moment from "moment"

import { Booking } from "typescript"
import { useMutation, gql } from "@apollo/client"
import { QUERY_BOOKINGS } from "libs"

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
      updateBookingInput: {
        title: $title
        start: $start
        end: $end
        roomId: $roomId
        userId: $userId
        id: $id
      }
    ) {
      id
      roomId
      userId
      title
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
  const [updateBooking] = useMutation(EDIT_BOOKING_MUTATION, {
    refetchQueries: [{ query: QUERY_BOOKINGS }],
  })

  const onFinish = async (values: any) => {
    try {
      console.log("values", values)
      const res = await updateBooking({
        variables: {
          id: 1,
          userId: 1,
          roomId: 1,
          title: "Meeting",
          end: new Date().getTime(),
          start: new Date().getTime(),
          ...values,
        },
      })
      console.log("res", res)
      setIsModalOpen(false)
      setVariables(undefined)
    } catch (error) {
      console.error(error)
    }
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
