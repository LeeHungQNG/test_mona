import { Modal } from 'antd';

const ConfirmOrder = ({ showModal, closeModal, cart, totalAmount, paymentMethod, form, customerPayment }) => {
  return (
    <Modal title="Xác nhận đơn hàng" open={showModal} onOk={closeModal} onCancel={closeModal}>
      <p>Thông tin khách hàng:</p>
      <hr />
      <div>Họ tên: {form.getFieldValue('customerName')}</div>
      <p>Email: {form.getFieldValue('customerEmail')}</p>
      <p>Số điện thoại: {form.getFieldValue('customerPhone')}</p>
      <hr />
      <p>Thông tin giỏ hàng:</p>
      <hr />
      {cart.map((item) => (
        <div key={item.name}>
          <div>Tên sản phẩm: {item.name}</div>
          <div>Số lượng: {item.quantity}</div>
          <div>Đơn giá: {item.price}</div>
        </div>
      ))}
      <hr />
      <p>Tổng tiền: {totalAmount}</p>
      <p>Phương thức thanh toán: {paymentMethod}</p>
      {paymentMethod === 'cash' && (
        <p>
          <strong>Tiền khách đưa:</strong> {customerPayment}
        </p>
      )}
      {paymentMethod === 'cash' && customerPayment > totalAmount && (
        <p>
          <strong>Tiền thừa trả khách:</strong> {customerPayment - totalAmount}
        </p>
      )}
    </Modal>
  );
};
export default ConfirmOrder;
