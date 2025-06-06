import axios from "axios";
import { useState } from "react";
import useInvoice from "../api/useInvoice";

export default function useInvoiceHandler() {
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

  return {
    handleSearch,
    searchTerm,
    filteredInvoice,
    filteredCustomerInvoice,
    filteredSupplierInvoice,
  };
}
