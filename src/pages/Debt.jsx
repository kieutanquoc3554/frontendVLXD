import useDebt from "../hooks/api/useDebt";
import useDebtHandler from "../hooks/handler/useDebtHandler";
import useDetailDebt from "../hooks/api/useDetailDebt";
import useDetailsDebtHandler from "../hooks/handler/useDetailsDebtHandler";
import TabsDebt from "../components/TabsDebt";
import DebtModal from "../components/DebtModal";
import SupplierDebtModal from "../components/SupplierDebtModal";
import useSupplierDebtHandler from "../hooks/handler/useSupplierDebtHandler";
import useDetailSupplierDebt from "../hooks/api/useDetailSupplierDebt";
import HeadingToolDebt from "../components/HeadingToolDebt";

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
    searchTerm,
    setSearchTerm,
    handleSearch,
    filteredCustomerDebt,
    filteredSupplierDebt,
    isSearched,
  } = useDebtHandler({ detailDebt, fetchDebt, fetchViewDetails });
  const {
    selectedSupplierDebt,
    isOpenDetailDebtModal,
    handleViewSupplierDebtDetails,
    setIsOpenDetailDebtModal,
    isOpenPaySupplierDebt,
    handlePaySupplierDebt,
    setIsOpenPaySupplierDebt,
  } = useSupplierDebtHandler({});
  const { detailSupplierDebt, fetchSupplierDebtDetail } =
    useDetailSupplierDebt(selectedSupplierDebt);

  return (
    <>
      <h2>Quản lý công nợ</h2>
      <HeadingToolDebt setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      <TabsDebt
        supplierDebt={supplierDebt}
        debt={debt}
        handleViewDetails={handleViewDetails}
        handleViewSupplierDebtDetails={handleViewSupplierDebtDetails}
        searchTerm={searchTerm}
        filteredCustomerDebt={filteredCustomerDebt}
        filteredSupplierDebt={filteredSupplierDebt}
        isSearched={isSearched}
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
        isOpenPaySupplierDebt={isOpenPaySupplierDebt}
        handlePaySupplierDebt={handlePaySupplierDebt}
        setIsOpenPaySupplierDebt={setIsOpenPaySupplierDebt}
        fetchSupplierDebtDetail={fetchSupplierDebtDetail}
      />
    </>
  );
}
