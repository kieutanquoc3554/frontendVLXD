import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useSuppliers() {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [deletedSuppliers, setDeletedSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/supplier/");
      setSuppliers(data.filter((supplier) => !supplier.deleted));
      setDeletedSuppliers(data.filter((supplier) => supplier.deleted));
    } catch (error) {
      message.error("Lỗi khi tải danh sách nhà cung cấp", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return { loading, suppliers, deletedSuppliers, fetchSuppliers };
}
