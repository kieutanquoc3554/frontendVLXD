export default function useDebtExportPDF({ selectedTab, isSearched }) {
  const getDataForSelectedTab = () => {
    if (selectedTab === "1") {
      if (isSearched) {
        return date ? filteredCustomerByDate : filteredCustomerDebt;
      } else {
        return debt;
      }
    } else if (selectedTab === "2") {
      // Công nợ nhà cung cấp
      if (isSearched) {
        return date ? filteredSupplierByDate : filteredSupplierDebt;
      } else {
        return supplierDebt;
      }
    }
    return [];
  };
}
