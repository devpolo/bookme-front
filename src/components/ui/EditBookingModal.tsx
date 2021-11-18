import { Dispatch, SetStateAction } from "react"

import { Modal, ModalProps, Form, Input, Button, DatePicker } from "antd"

import moment from "moment"

import { Booking } from "typescript"
import { useMutation, gql } from "@apollo/client"
import { QUERY_BOOKINGS, useAuth } from "libs"

export const EDIT_BOOKING_MUTATION = gql`
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

export const REMOVE_BOOKING_MUTATION = gql`
  mutation removeBooking($id: Float!, $userId: Float!) {
    removeBooking(DeleteBookingInput: { id: $id, userId: $userId })
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
  const { me } = useAuth()

  const [updateBooking] = useMutation(EDIT_BOOKING_MUTATION, {
    refetchQueries: [{ query: QUERY_BOOKINGS }],
  })

  const [removeBooking] = useMutation(REMOVE_BOOKING_MUTATION, {
    refetchQueries: [{ query: QUERY_BOOKINGS }],
  })

  const closeModal = () => {
    setIsModalOpen(false)
    setVariables(undefined)
  }

  const onFinish = async (values: any) => {
    try {
      await updateBooking({
        variables: {
          ...variables,
          ...values,
          userId: me.id,
        },
      })

      closeModal()
    } catch {}
  }

  const deleteBooking = async () => {
    try {
      await removeBooking({
        variables: {
          id: variables?.id,
          userId: me.id,
        },
      })
      closeModal()
    } catch {}
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
              Update
            </Button>
          </Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            danger
            onClick={deleteBooking}
          >
            Remove
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default Calendar
