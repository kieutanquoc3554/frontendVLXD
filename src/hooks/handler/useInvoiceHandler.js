import axios from "axios";
import { useState } from "react";
import useInvoice from "../api/useInvoice";
import pdfMake from "pdfmake/build/pdfmake";
import formatCurrency from "../../utils/formatCurrency";
import moment from "moment";
import { message } from "antd";
import * as XLSX from "xlsx";

export default function useInvoiceHandler({
  selectedTab,
  invoice,
  customerInvoice,
  supplierInvoice,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoice, setFilteredInvoice] = useState([]);
  const [filteredCustomerInvoice, setFilteredCustomerInvoice] = useState([]);
  const [filteredSupplierInvoice, setFilteredSupplierInvoice] = useState([]);
  const { fetchInvoice } = useInvoice();

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (!value) {
      fetchInvoice();
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bill/search?query=${value}`
      );
      setFilteredInvoice(response.data.all);
      setFilteredCustomerInvoice(response.data.customer);
      setFilteredSupplierInvoice(response.data.supplier);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

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

  const handleExportExcel = () => {
    const data = getDataForSelectedTab();
    if (!data.length) {
      message.error("Không có dữ liệu để xuất file Excel");
      return;
    }
    const header = [
      "Mã hoá đơn",
      "Tên khách hàng/nhà cung cấp",
      "Ngày thanh toán",
      "Tổng tiền",
      "Đã trả",
      "Còn lại",
      "Ghi chú",
    ];
    const worksheetData = [
      header,
      ...data.map((item) => [
        item.id?.toString() || "",
        item.name || "",
        moment(item.paymentDate).format("HH:mm DD/MM/YYYY") || "",
        formatCurrency(item.totalAmount) || 0,
        formatCurrency(item.paidAmount) || 0,
        formatCurrency(item.remainingAmount) || 0,
        item.note || "",
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wscols = [
      { wch: 15 }, // mã hoá đơn
      { wch: 40 }, // tên khách hàng/nhà cung cấp
      { wch: 20 }, // ngày thanh toán
      { wch: 15 }, // tổng tiền
      { wch: 15 }, // đã trả
      { wch: 15 }, // còn lại
      { wch: 30 }, // ghi chú
    ];
    ws["!cols"] = wscols;
    for (let col = 0; col < header.length; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = {
        font: { bold: true, color: { rgb: "000000" } },
        alignment: { horizontal: "center", vertical: "center" },
        fill: { fgColor: { rgb: "EEEEEE" } },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DanhSachHoaDon");
    const title =
      selectedTab === "1"
        ? "Danh_sach_tat_ca_hoa_don"
        : selectedTab === "2"
        ? "Danh_sach_hoa_don_khach_hang"
        : "Danh_sach_hoa_don_nha_cung_cap";

    const fileName = `${title}_${moment().format("YYYYMMDD_HHmmss")}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return {
    handleSearch,
    handleExportPDF,
    getDataForSelectedTab,
    searchTerm,
    filteredInvoice,
    filteredCustomerInvoice,
    filteredSupplierInvoice,
    handleExportExcel,
  };
}
