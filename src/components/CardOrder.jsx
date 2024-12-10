import { Button, Card, Form, InputNumber, Radio } from 'antd';

const CardOrder = ({ totalAmount, paymentMethod, setPaymentMethod, customerPayment, setCustomerPayment, handlePayment }) => {
  return (
    <Card style={{ marginTop: 20 }} title="Thanh toán">
      <p>Tổng tiền: {totalAmount}</p>
      <Form.Item label="Phương thức thanh toán">
        <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <Radio value="cash">Tiền mặt</Radio>
          <Radio value="card">Thẻ</Radio>
        </Radio.Group>
      </Form.Item>
      {paymentMethod === 'cash' && (
        <Form.Item label="Tiền khách đưa">
          <InputNumber value={customerPayment} onChange={(value) => setCustomerPayment(value)} />
        </Form.Item>
      )}
      {paymentMethod === 'cash' && customerPayment > totalAmount && <p>Tiền thừa trả khách: {customerPayment - totalAmount}</p>}
      <Button type="primary" onClick={handlePayment}>
        Thanh toán
      </Button>
    </Card>
  );
};
export default CardOrder;
