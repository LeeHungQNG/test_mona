import { Button, InputNumber, Select, Table } from 'antd';
import { discounts } from '../data/data';

const TableOrder = ({ cart, updateCartItem, removeCartItem }) => {
  const columns = [
    { title: 'Sản phẩm', dataIndex: 'name' },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      render: (price, _, index) => <InputNumber value={price} />,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (quantity, _, index) => <InputNumber value={quantity} min={1} onChange={(value) => updateCartItem(index, 'quantity', value)} />,
    },
    {
      title: 'Mã khuyến mãi',
      dataIndex: 'discountCode',
      render: (discountCode, _, index) => (
        <Select placeholder="Chọn mã khuyến mãi" onChange={(value) => updateCartItem(index, 'discountCode', value)}>
          {discounts.map((disc) => (
            <Select.Option key={disc.code} value={disc.code}>
              {disc.code}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    { title: 'Tổng tiền', dataIndex: 'total', render: (total) => total },
    {
      title: 'Hành động',
      render: (_, __, index) => (
        <Button danger onClick={() => removeCartItem(index)}>
          Xóa
        </Button>
      ),
    },
  ];
  return <Table dataSource={cart} rowKey={(record) => record.id || `${record.name}-${record.price}`} columns={columns} />;
};
export default TableOrder;
