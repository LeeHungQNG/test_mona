import { useState } from 'react';
import { discounts } from '../data/data';
import ConfirmOrder from './ConfirmOrder';
import CardOrder from './CardOrder';
import FormOrder from './FormOrder';
import TableOrder from './TableOrder';
import { Form } from 'antd';
const CreateOrder = () => {
  const [form] = Form.useForm();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerPayment, setCustomerPayment] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1, discountCode: null, total: product.price }]);
  };

  const updateCartItem = (index, field, value) => {
    const newCart = [...cart];
    const item = newCart[index];
    if (field === 'quantity') {
      item[field] = value;
    }
    if (field === 'discountCode') {
      const disc = discounts.find((p) => p.code === value);
      if (disc) {
        if (disc.type === 'percent') {
          item.total = item.price * item.quantity * (1 - disc.value / 100);
        } else if (disc.type === 'direct') {
          item.total = item.price * item.quantity - disc.value;
        }
      }
      item.discountCode = value;
    } else {
      item.total = item.price * item.quantity;
    }
    setCart(newCart);
  };

  const removeCartItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  const handlePayment = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ width: '100%', display: 'flex', gap: '16px', justifyContent: 'center' }}>
      <div style={{ flex: '1' }}>
        <FormOrder form={form} addToCart={addToCart} />

        <TableOrder cart={cart} updateCartItem={updateCartItem} removeCartItem={removeCartItem} />
      </div>
      <div style={{ flex: '1' }}>
        <CardOrder
          totalAmount={totalAmount}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          customerPayment={customerPayment}
          setCustomerPayment={setCustomerPayment}
          handlePayment={handlePayment}
        />
      </div>

      {/* Confirm Modal */}
      <ConfirmOrder
        form={form}
        showModal={showModal}
        closeModal={closeModal}
        cart={cart}
        totalAmount={totalAmount}
        paymentMethod={paymentMethod}
        customerPayment={customerPayment}
      />
    </div>
  );
};
export default CreateOrder;
