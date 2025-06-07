import { Button, Flex, Input } from "antd";
import { BsFiletypePdf } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
const { Search } = Input;

const HeadingButtonBill = ({ onSearch, onExportPDF, handleExportExcel }) => {
  return (
    <Flex gap={10} align="center">
      <Search
        placeholder="Tìm kiếm hoá đơn (theo mã hoá đơn, theo tên khách hàng, ngày thanh toán, mã tham chiếu)"
        onSearch={onSearch}
        enterButton
      />
      <Button
        type="primary"
        style={{ backgroundColor: "#AD0B00" }}
        onClick={() => onExportPDF()}
      >
        <BsFiletypePdf />
        Xuất PDF
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "#0D7941" }}
        onClick={() => handleExportExcel()}
      >
        <RiFileExcel2Line />
        Xuất Excel
      </Button>
    </Flex>
  );
};

export default HeadingButtonBill;
