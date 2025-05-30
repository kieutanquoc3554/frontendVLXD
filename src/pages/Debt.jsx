import useDebt from "../hooks/api/useDebt";
import useDebtHandler from "../hooks/handler/useDebtHandler";
import useDetailDebt from "../hooks/api/useDetailDebt";
import useDetailsDebtHandler from "../hooks/handler/useDetailsDebtHandler";
import TabsDebt from "../components/TabsDebt";
import DebtModal from "../components/DebtModal";

export default function Debt() {
  const {
    selectedDebt,
    isModalViewDetails,
    handleViewDetails,
    setIsModalViewDetails,
  } = useDetailsDebtHandler();
  const { detailDebt, fetchViewDetails } = useDetailDebt(selectedDebt);
  const { debt, fetchDebt } = useDebt(selectedDebt);
  const {
    editingDebt,
    amount,
    setAmount,
    setEditingDebt,
    handleUpdateDebt,
    handleSubmit,
    setPaymentMethod,
  } = useDebtHandler({ detailDebt, fetchDebt, fetchViewDetails });

  return (
    <>
      <h2>Quản lý công nợ</h2>
      <TabsDebt debt={debt} handleViewDetails={handleViewDetails} />
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
    </>
  );
}
