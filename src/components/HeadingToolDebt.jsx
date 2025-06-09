import { Input, DatePicker, Button, Flex } from "antd";
const { Search } = Input;

const HeadingToolDebt = ({ setSearchTerm, onSearch }) => {
  return (
    <Flex align="center" gap={10}>
      <Search
        placeholder="Tìm kiếm công nợ"
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={onSearch}
        enterButton
      />
      <DatePicker style={{ width: "30%" }} placeholder="Ngày đặt hàng" />
      <Button type="default">Tìm</Button>
      <Button type="primary" style={{ backgroundColor: "#AD0B00" }}>
        Xuất PDF công nợ
      </Button>
      <Button type="primary" style={{ backgroundColor: "#0D7941" }}>
        Xuất Excel công nợ
      </Button>
    </Flex>
  );
};

export default HeadingToolDebt;
