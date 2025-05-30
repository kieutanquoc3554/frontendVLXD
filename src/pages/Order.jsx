import { Button, Form } from "antd";
import { useState } from "react";
import useOrder from "../hooks/api/useOrder";
import ColumnOrders from "../components/ColumnOrders";
import { useEffect } from "react";
import { useOrderHandler } from "../hooks/handler/useOrderHandler";
import CreateOrderModal from "../components/CreateOrderModal";
import DetailsOrderModal from "../components/DetailsOrderModal";
import OrderTabs from "../components/OrderTabs";

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { orders, isLoading, fetchOrders, fetchOrderById, detailsOrder } =
    useOrder();
  const { handleStatusChange } = useOrderHandler(fetchOrders);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrderById();
  }, []);

  return (
    <>
      <h2>Quản lý đơn hàng</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Thêm đơn hàng
      </Button>
      <OrderTabs
        orders={orders}
        isLoading={isLoading}
        ColumnOrders={ColumnOrders}
        form={form}
        handleStatusChange={handleStatusChange}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
        fetchOrderById={fetchOrderById}
        fetchOrder={fetchOrders}
        detailsOrder={detailsOrder}
      />
      <CreateOrderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <DetailsOrderModal
        form={form}
        isDetailsModalOpen={isDetailsModalOpen}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
      />
    </>
  );
};

export default Order;
