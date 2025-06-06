import moment from "moment";
import formatCurrency from "../utils/formatCurrency";
import { Button } from "antd";
import { GoChevronRight } from "react-icons/go";

const ColumnBill = () => {
  return [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    {
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date) => moment(date).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Tổng hoá đơn",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (total) => formatCurrency(total),
    },
    {
      title: "Đã thanh toán",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paid) => formatCurrency(paid),
    },
    {
      title: "Số tiền còn lại",
      dataIndex: "remainingAmount",
      key: "remainingAmount",
      render: (remaining) => formatCurrency(remaining),
    },
    {
      title: "Nhóm khách hàng",
      dataIndex: "type",
      key: "type",
      render: (type) => (type === "customer" ? "Khách hàng" : "Nhà cung cấp"),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (note) => (!note ? "Không có ghi chú" : note),
    },
    { title: "Mã tham chiếu", dataIndex: "referenceId", key: "referenceId" },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <>
          <Button type="default" title="Xem chi tiết">
            <GoChevronRight />
          </Button>
        </>
      ),
    },
  ];
};

export default ColumnBill;
