import { Input, DatePicker } from "antd";
const { Search } = Input;

const HeadingButtonOrder = ({ setSearchTerm, onSearch }) => {
  return (
    <>
      <Search
        onSearch={onSearch}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm đơn hàng (theo mã đơn hàng, theo tên khách hàng)"
        enterButton
      />
      <DatePicker placeholder="Ngày đặt hàng" style={{ width: "20%" }} />
    </>
  );
};

export default HeadingButtonOrder;
