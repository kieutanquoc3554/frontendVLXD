import { Table, Tabs } from "antd";
import useInvoice from "../hooks/api/useInvoice";
import ColumnBill from "./ColumnBill";
import HeadingButtonBill from "./HeadingButtonBill";
import useInvoiceHandler from "../hooks/handler/useInvoiceHandler";
import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import formatCurrency from "../utils/formatCurrency";
import moment from "moment";

const TabsBill = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { invoice, customerInvoice, supplierInvoice } = useInvoice();
  const {
    handleSearch,
    searchTerm,
    filteredInvoice,
    filteredCustomerInvoice,
    filteredSupplierInvoice,
  } = useInvoiceHandler();

  const getDataForSelectedTab = () => {
    if (selectedTab === "1")
      return filteredInvoice.length === 0 ? invoice : filteredInvoice;
    if (selectedTab === "2")
      return filteredCustomerInvoice.length === 0
        ? customerInvoice
        : filteredCustomerInvoice;
    if (selectedTab === "3")
      return filteredSupplierInvoice.length === 0
        ? supplierInvoice
        : filteredSupplierInvoice;
    return [];
  };

  const handleExportPDF = () => {
    const data = getDataForSelectedTab();

    let title = "";
    if (selectedTab === "1") title = "Danh sách tất cả hóa đơn";
    else if (selectedTab === "2") title = "Danh sách hóa đơn khách hàng";
    else if (selectedTab === "3") title = "Danh sách hóa đơn nhà cung cấp";

    //  in4
    const companyInfo = {
      name: "Vật liệu Xây dựng & Trang trí nội thất Kim Dung",
      address: "Phường Tân Thành, Thành phố Cà Mau",
      phone: "Hotline: 0916 35 22 35",
      email: "Chưa thêm",
    };
    // content
    const headers = [
      { text: "Mã hóa đơn", style: "tableHeader" },
      { text: "Tên khách hàng/nhà cung cấp", style: "tableHeader" },
      { text: "Ngày thanh toán", style: "tableHeader" },
      { text: "Tổng tiền", style: "tableHeader" },
      { text: "Đã trả", style: "tableHeader" },
      { text: "Còn lại", style: "tableHeader" },
      { text: "Ghi chú", style: "tableHeader" },
    ];

    const body = [
      headers,
      ...data.map((item) => [
        item.id?.toString() || "",
        item.name || "",
        moment(item.paymentDate).format("HH:mm DD/MM/YYYY") || "",
        formatCurrency(item.totalAmount) || "0",
        formatCurrency(item.paidAmount) || "0",
        formatCurrency(item.remainingAmount) || "0",
        item.note || "",
      ]),
    ];

    const docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 100, 40, 40], // l, t, r, b
      header: [
        {
          columns: [
            {
              width: "auto",
              text: companyInfo.name,
              style: "companyName",
            },
            {
              width: "*",
              text: "",
            },
            {
              width: "auto",
              text: companyInfo.phone,
              style: "companyPhone",
              alignment: "right",
            },
          ],
          margin: [40, 10, 40, 0],
        },
        {
          columns: [
            {
              width: "auto",
              text: companyInfo.address,
              style: "companyAddress",
            },
            {
              width: "*",
              text: "",
            },
            {
              width: "auto",
              text: companyInfo.email,
              style: "companyEmail",
              alignment: "right",
            },
          ],
          margin: [40, 0, 40, 10],
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 600,
              y2: 0,
              lineWidth: 1,
              lineColor: "#444",
            },
          ],
        },
      ],
      content: [
        {
          text: title,
          style: "header",
          margin: [0, 10, 0, 20],
          alignment: "center",
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto", "auto", "*"],
            body: body,
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#eeeeee" : null),
          },
        },
      ],
      styles: {
        companyName: {
          fontSize: 14,
          bold: true,
          color: "#2c3e50",
        },
        companyPhone: {
          fontSize: 10,
          italics: true,
          color: "#34495e",
        },
        companyAddress: {
          fontSize: 10,
          color: "#34495e",
        },
        companyEmail: {
          fontSize: 10,
          italics: true,
          color: "#34495e",
        },
        header: {
          fontSize: 16,
          bold: true,
          marginBottom: 15,
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: 9,
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: "black",
        },
      },
      defaultStyle: {
        columnGap: 15,
      },
    };

    pdfMake.createPdf(docDefinition).download(`${title}.pdf`);
  };

  return (
    <>
      <HeadingButtonBill
        onSearch={handleSearch}
        onExportPDF={handleExportPDF}
      />
      <Tabs defaultActiveKey={selectedTab} onChange={setSelectedTab}>
        <Tabs.TabPane tab="Tất cả hoá đơn" key="1">
          <Table
            dataSource={searchTerm ? filteredInvoice : invoice}
            columns={ColumnBill()}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Hoá đơn khách hàng" key="2">
          <Table
            dataSource={searchTerm ? filteredCustomerInvoice : customerInvoice}
            columns={ColumnBill()}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Hoá đơn nhà cung cấp" key="3">
          <Table
            dataSource={searchTerm ? filteredSupplierInvoice : supplierInvoice}
            columns={ColumnBill()}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default TabsBill;
