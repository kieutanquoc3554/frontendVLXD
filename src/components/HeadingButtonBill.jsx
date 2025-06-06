import { Button, Flex, Input } from "antd";
const { Search } = Input;

const HeadingButtonBill = ({ onSearch, onExportPDF }) => {
  return (
    <Flex gap={20} align="center">
      <Search
        placeholder="Tìm kiếm hoá đơn (theo mã hoá đơn, theo tên khách hàng, ngày thanh toán, mã tham chiếu)"
        onSearch={onSearch}
        enterButton
      />
      <Button type="primary" onClick={() => onExportPDF()}>
        Xuất danh sách hoá đơn
      </Button>
      <Button type="primary" onClick={() => onExportPDF()}>
        Xuất bảng tính danh sách hoá đơn
      </Button>
    </Flex>
  );
};

export default HeadingButtonBill;
