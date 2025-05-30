import { message } from "antd";
import { order } from "../../utils/order";
import useOrder from "../api/useOrder";
import axios from "axios";

export const useOrderHandler = (fetchOrders) => {
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

  return { handleStatusChange };
};
