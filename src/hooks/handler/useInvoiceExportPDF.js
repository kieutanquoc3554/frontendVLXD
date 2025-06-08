export default function useInvoiceExportPDF() {
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
}
