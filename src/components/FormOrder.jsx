import { Form, Input, Select } from 'antd';
import { products } from '../data/data';

const FormOrder = ({ addToCart, form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Tên khách hàng" name="customerName" required>
        <Input />
      </Form.Item>
      <Form.Item label="Email khách hàng" name="customerEmail" required>
        <Input />
      </Form.Item>
      <Form.Item label="Số điện thoại khách hàng" name="customerPhone" required>
        <Input />
      </Form.Item>
      <Form.Item label="Thêm sản phẩm">
        <Select placeholder="Chọn sản phẩm" onChange={(id) => addToCart(products.find((p) => p.id === id))}>
          {products.map((product) => (
            <Select.Option key={product.id} value={product.id}>
              {product.name} - {product.price}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
export default FormOrder;
