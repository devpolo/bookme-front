import {
  Modal,
  ModalProps,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd"
import { Booking } from "typescript"

interface ICalendarProps extends ModalProps {
  variables?: Booking
}

const Calendar = ({ variables, ...props }: ICalendarProps) => {
  return (
    <>
      <Modal title='Vertically centered modal dialog' centered {...props}>
        <Form>
          <Form.Item label='title'>
            <Input value={variables?.title} />
          </Form.Item>
          <Form.Item label='start'>
            <DatePicker value={new Date(variables?.start)} />
          </Form.Item>
          <Form.Item label='end'>
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Calendar
