import { message } from "antd";
import { order } from "../../utils/order";
import useOrder from "../api/useOrder";
import axios from "axios";
import { useEffect, useState } from "react";

export const useOrderHandler = (fetchOrders) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedOrder, setSearchedOrder] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const { fetchOrderById } = useOrder();
  const { statusPriority } = order();
  const handleStatusChange = async (orderId, status) => {
    try {
      const order = await fetchOrderById(orderId);
      const currentStatus = order.status;
      if (
        statusPriority[status] < statusPriority[currentStatus] &&
        status !== "Cancelled"
      ) {
        message.warning(
          `Không thể cập nhật trạng thái ${currentStatus} thành ${status}`
        );
        return;
      }
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        {
          withCredentials: true,
        }
      );
      message.success(`Cập nhật trạng thái thành công: ${status}`);
      fetchOrders();
    } catch (error) {
      message.error("Lỗi khi cập nhật trạng thái đơn hàng", error);
    }
  };

  const handleSearch = async () => {
    setIsSearched(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/utils/search?query=${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      setSearchedOrder(response.data);
      message.success("Tìm kiếm thành công!");
    } catch (error) {
      console.log("Có lỗi tìm kiếm xảy ra: ", error);
      message.error("Từ khoá tìm kiếm bị trống!");
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setIsSearched(false);
      setSearchedOrder([]);
    }
  }, [searchTerm]);

  return {
    handleStatusChange,
    isSearched,
    setSearchTerm,
    handleSearch,
    searchedOrder,
  };
};
