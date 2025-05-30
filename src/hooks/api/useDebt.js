import axios from "axios";
import { useEffect, useState } from "react";

export default function useDebt() {
  const [debt, setDebt] = useState([]);
  const fetchDebt = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/debt");
      setDebt(response.data);
    } catch (error) {
      console.error("Lỗi lấy công nợ", error);
    }
  };

  useEffect(() => {
    fetchDebt();
  }, []);

  return { debt, fetchDebt };
}
