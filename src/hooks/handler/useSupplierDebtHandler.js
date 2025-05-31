import { useState } from "react";

export default function useSupplierDebtHandler() {
  const [selectedSupplierDebt, setSelectedSupplierDebt] = useState(null);
  const [isOpenDetailDebtModal, setIsOpenDetailDebtModal] = useState(false);

  const handleViewSupplierDebtDetails = (sup_debt) => {
    setIsOpenDetailDebtModal(true);
    setSelectedSupplierDebt(sup_debt);
  };

  return {
    selectedSupplierDebt,
    isOpenDetailDebtModal,
    handleViewSupplierDebtDetails,
    setIsOpenDetailDebtModal,
  };
}
