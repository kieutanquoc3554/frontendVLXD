import { Modal } from "antd";

const SupplierDebtModal = ({
  selectedSupplierDebt,
  isOpenDetailDebtModal,
  handleViewSupplierDebtDetails,
  setIsOpenDetailDebtModal,
}) => {
  return <Modal title="Chi tiết công nợ" open={isOpenDetailDebtModal}></Modal>;
};

export default SupplierDebtModal;
