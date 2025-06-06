import axios from "axios";
import { useEffect, useState } from "react";

export default function useDetailSupplierDebt(selectedSupplierDebt) {
  const [detailSupplierDebt, setDetailSupplierDebt] = useState({});

  const fetchSupplierDebtDetail = async () => {
    try {
      if (selectedSupplierDebt?.id) {
        const response = await axios.get(
          `http://localhost:5000/api/debt/supplier-debts/${selectedSupplierDebt.id}`
        );
        setDetailSupplierDebt(response.data);
      }
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy chi tiết công nợ", error);
    }
  };
  useEffect(() => {
    fetchSupplierDebtDetail();
  }, [selectedSupplierDebt]);

  return { detailSupplierDebt, fetchSupplierDebtDetail };
}
