import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useDebtHandler({
  detailDebt,
  fetchDebt,
  fetchViewDetails,
}) {
  const [editingDebt, setEditingDebt] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomerDebt, setFilteredCustomerDebt] = useState([]);
  const [filteredSupplierDebt, setFilteredSupplierDebt] = useState([]);

  useEffect(() => {
    if (detailDebt) {
      setAmount(detailDebt.paid_amount || 0);
    }
  }, [detailDebt]);

  const handleUpdateDebt = () => {
    setEditingDebt(true);
    setAmount(detailDebt.paid_amount);
  };

  const handleSubmit = async () => {
    try {
      if (!amount || !paymentMethod) {
        return message.error("Thiếu số tiền hoặc phương thức thanh toán");
      }
      const amount_customer = parseFloat(amount);
      const response = await axios.post(
        `http://localhost:5000/api/debt/update/${detailDebt.id}`,
        {
          id: detailDebt.id,
          amount: amount_customer,
          payment_method: paymentMethod,
        }
      );
      message.success(response.data.message);
      fetchDebt();
      fetchViewDetails();
    } catch (error) {
      console.log(`Có lỗi khi cập nhật công nợ`, error);
    }
  };

  const handleSearch = async () => {
    setIsSearched(true);
    try {
      if (!searchTerm) {
        return message.error("Không có từ khoá tìm kiếm");
      }
      const response = await axios.get(
        `http://localhost:5000/api/debt/search/searchDebt?query=${searchTerm}`
      );
      setFilteredCustomerDebt(response.data.customer);
      setFilteredSupplierDebt(response.data.supplier);
    } catch (error) {
      return message.error("Lỗi tìm kiếm", error);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setIsSearched(false);
      setFilteredCustomerDebt([]);
      setFilteredSupplierDebt([]);
    }
  }, [searchTerm]);

  return {
    handleUpdateDebt,
    handleSubmit,
    editingDebt,
    setPaymentMethod,
    setEditingDebt,
    amount,
    setAmount,
    searchTerm,
    setSearchTerm,
    handleSearch,
    filteredCustomerDebt,
    filteredSupplierDebt,
    isSearched,
  };
}
