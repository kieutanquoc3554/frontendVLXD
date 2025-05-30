import { Form } from "antd";
import { useEffect, useState } from "react";
import "dayjs/locale/vi";
import SuspendEmployeeModal from "../components/SuspendEmployeeModal";
import useEmployee from "../hooks/api/useEmployee";
import EmployeeColumn from "../components/EmployeeColumn";
import useEmployeeHandler from "../hooks/handler/useEmployeeHandler";
import EmployeeToolbar from "../components/EmployeeToolbar";
import EmployeeTabs from "../components/EmployeeTabs";
import EmployeeModal from "../components/EmployeeModal";

export default function Employee() {
  const [selectedFilterRole, setSelectedFilterRole] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isLoading, employees, deletedEmployees, fetchEmployees } =
    useEmployee();
  const [isOpenSuspendModal, setIsOpenSuspendModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form] = Form.useForm();
  const {
    handleAddEmployee,
    handleUpdateEmployee,
    handleSuspendEmployee,
    handleRestoreEmployee,
    handleDeleteEmployee,
    handleSubmit,
  } = useEmployeeHandler({
    form,
    setIsOpenModal,
    setSelectedEmployee,
    setIsOpenSuspendModal,
    fetchEmployees,
    selectedEmployee,
  });

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>Quản lý người dùng/nhân viên</h2>
      <EmployeeToolbar
        handleAddEmployee={handleAddEmployee}
        setSelectedFilterRole={setSelectedFilterRole}
      />
      <EmployeeTabs
        EmployeeColumn={EmployeeColumn}
        handleUpdateEmployee={handleUpdateEmployee}
        handleSuspendEmployee={handleSuspendEmployee}
        handleRestoreEmployee={handleRestoreEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
        employees={employees}
        deletedEmployees={deletedEmployees}
        isLoading={isLoading}
      />
      <EmployeeModal
        form={form}
        selectedEmployee={selectedEmployee}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        handleSubmit={handleSubmit}
      />
      <SuspendEmployeeModal
        open={isOpenSuspendModal}
        onClose={(updated) => {
          setIsOpenSuspendModal(false);
          if (updated) fetchEmployees();
        }}
        employee={selectedEmployee}
      />
    </div>
  );
}
