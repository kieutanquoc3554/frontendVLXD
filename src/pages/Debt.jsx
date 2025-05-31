import useDebt from "../hooks/api/useDebt";
import useDebtHandler from "../hooks/handler/useDebtHandler";
import useDetailDebt from "../hooks/api/useDetailDebt";
import useDetailsDebtHandler from "../hooks/handler/useDetailsDebtHandler";
import TabsDebt from "../components/TabsDebt";
import DebtModal from "../components/DebtModal";
import SupplierDebtModal from "../components/SupplierDebtModal";
import useSupplierDebtHandler from "../hooks/handler/useSupplierDebtHandler";
import useDetailSupplierDebt from "../hooks/api/useDetailSupplierDebt";

export default function Debt() {
  const {
    selectedDebt,
    isModalViewDetails,
    handleViewDetails,
    setIsModalViewDetails,
  } = useDetailsDebtHandler();
  const { detailDebt, fetchViewDetails } = useDetailDebt(selectedDebt);
  const { debt, fetchDebt, supplierDebt } = useDebt(selectedDebt);
  const {
    editingDebt,
    amount,
    setAmount,
    setEditingDebt,
    handleUpdateDebt,
    handleSubmit,
    setPaymentMethod,
  } = useDebtHandler({ detailDebt, fetchDebt, fetchViewDetails });
  const {
    selectedSupplierDebt,
    isOpenDetailDebtModal,
    handleViewSupplierDebtDetails,
    setIsOpenDetailDebtModal,
  } = useSupplierDebtHandler();
  const { detailSupplierDebt } = useDetailSupplierDebt(selectedSupplierDebt);

  return (
    <>
      <h2>Quản lý công nợ</h2>
      <TabsDebt
        supplierDebt={supplierDebt}
        debt={debt}
        handleViewDetails={handleViewDetails}
        handleViewSupplierDebtDetails={handleViewSupplierDebtDetails}
      />
      <DebtModal
        isModalViewDetails={isModalViewDetails}
        setIsModalViewDetails={setIsModalViewDetails}
        editingDebt={editingDebt}
        amount={amount}
        setAmount={setAmount}
        setEditingDebt={setEditingDebt}
        handleUpdateDebt={handleUpdateDebt}
        handleSubmit={handleSubmit}
        setPaymentMethod={setPaymentMethod}
        detailDebt={detailDebt}
      />
      <SupplierDebtModal
        selectedSupplierDebt={selectedSupplierDebt}
        isOpenDetailDebtModal={isOpenDetailDebtModal}
        handleViewSupplierDebtDetails={handleViewSupplierDebtDetails}
        setIsOpenDetailDebtModal={setIsOpenDetailDebtModal}
        detailSupplierDebt={detailSupplierDebt}
      />
    </>
  );
}
