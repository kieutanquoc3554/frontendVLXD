import { Button, Flex, Form, Input, InputNumber, Modal, Select } from "antd";
import useInventory from "../hooks/api/useInventory";
import useProduct from "../hooks/api/useProduct";
import ColumnInventory from "../components/ColumnInventory";
import ColumnInventoryLogs from "../components/ColumnInventoryLogs";
import TabsInventory from "../components/TabsInventory";
import InventoryModal from "../components/InventoryModal";
import useSuppliers from "../hooks/api/useSuppliers";
const { Search } = Input;

export default function Inventory() {
  const { products } = useProduct("active");
  const {
    form,
    inventory,
    importSlips,
    inventoryLogs,
    isLoading,
    editingItem,
    setEditingItem,
    handleEditModal,
    handleSearch,
    handleUpdate,
    handleSubmit,
  } = useInventory();
  const { suppliers } = useSuppliers();

  return (
    <>
      <h2>Quản lý kho hàng</h2>
      <Flex align="center" justify="space-between">
        <Button
          type="primary"
          onClick={() => handleEditModal(null)}
          style={{ marginBottom: 12 }}
        >
          Nhập kho
        </Button>
        <Search
          placeholder="Tìm sản phẩm..."
          allowClear
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </Flex>
      <TabsInventory
        ColumnInventory={ColumnInventory}
        handleEditModal={handleEditModal}
        inventory={inventory}
        importSlips={importSlips}
        isLoading={isLoading}
        ColumnInventoryLogs={ColumnInventoryLogs}
        inventoryLogs={inventoryLogs}
      />
      <InventoryModal
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        onUpdate={handleUpdate}
        form={form}
        products={products}
        handleSubmit={handleSubmit}
        suppliers={suppliers}
      />
    </>
  );
}
