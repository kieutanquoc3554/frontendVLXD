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
import useDebtSearch from "../hooks/handler/useDebtSearch";
import useDebtFilter from "../hooks/handler/useDebtFilter";

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
    isOpenPaySupplierDebt,
    handlePaySupplierDebt,
    setIsOpenPaySupplierDebt,
  } = useSupplierDebtHandler({});
  const { detailSupplierDebt, fetchSupplierDebtDetail } =
    useDetailSupplierDebt(selectedSupplierDebt);
  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    filteredCustomerDebt,
    filteredSupplierDebt,
    isSearched,
    setIsSearched,
  } = useDebtSearch();
  const {
    date,
    setDate,
    handleFilterByDate,
    filteredCustomerByDate,
    filteredSupplierByDate,
  } = useDebtFilter({ setIsSearched });

  return (
    <>
      <h2>Quản lý công nợ</h2>
      <HeadingToolDebt
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        setDate={setDate}
        onFilter={handleFilterByDate}
      />
      <TabsDebt
        supplierDebt={supplierDebt}
        debt={debt}
        handleViewDetails={handleViewDetails}
        handleViewSupplierDebtDetails={handleViewSupplierDebtDetails}
        searchTerm={searchTerm}
        filteredCustomerDebt={filteredCustomerDebt}
        filteredSupplierDebt={filteredSupplierDebt}
        filteredCustomerByDate={filteredCustomerByDate}
        filteredSupplierByDate={filteredSupplierByDate}
        isSearched={isSearched}
        date={date}
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
