import axios from "axios";
import { useEffect, useState } from "react";

export default function useDebt() {
  const [debt, setDebt] = useState([]);
  const [supplierDebt, setSupplierDebt] = useState([]);

  const fetchDebt = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/debt");
      setDebt(response.data);
    } catch (error) {
      console.error("Lỗi lấy công nợ", error);
    }
  };

  const fetchSupplierDebt = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/debt/get/supplierDebt"
      );
      setSupplierDebt(response.data);
    } catch (error) {
      console.error("Lỗi lấy công nợ", error);
    }
  };

  useEffect(() => {
    fetchDebt();
    fetchSupplierDebt();
  }, []);

  return { debt, fetchDebt, supplierDebt, fetchSupplierDebt };
}
