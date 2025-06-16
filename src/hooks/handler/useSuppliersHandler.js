import { message, Modal } from "antd";
import axios from "axios";

const useSuppliersHandler = ({
  form,
  setSelectedSupplier,
  selectedSupplier,
  setIsModalOpen,
  fetchSuppliers,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    form.setFieldsValue(supplier);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedSupplier) {
        await axios.put(
          `${apiUrl}/api/supplier/${selectedSupplier.id}`,
          values
        );
        message.success("Cập nhật danh mục thành công!");
      } else {
        await axios.post(`${apiUrl}/api/supplier`, values);
        message.success("Thêm cung cấp thành công!");
      }
      fetchSuppliers();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Lỗi khi lưu nhà cung cấp!" + error);
    }
  };

  const handleDeleteSupplier = (id) => {
    try {
      Modal.confirm({
        title: "Xác nhận xoá nhà cung cấp",
        content:
          "Khi xoá nhà cung cấp, các sản phẩm thuộc nhà cung cấp đó sẽ bị gán lại giá trị, có thể ảnh hưởng đến việc kiểm tra, tham khảo trong tương lai. Nếu bạn có nhu cầu khôi phục, vui lòng di chuyển đến thẻ Danh sách nhà cung cấp đã xoá",
        okText: "Xoá",
        okType: "danger",
        cancelText: "Huỷ",
        async onOk() {
          try {
            await axios.post(`${apiUrl}/api/supplier/${id}`, {});
            message.success("Đã xoá nhà cung cấp");
            fetchSuppliers();
          } catch (error) {
            message.error("Đã có lỗi xảy ra!" + error);
          }
        },
      });
    } catch (error) {
      message.error("Có lỗi xảy ra!" + error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.post(`${apiUrl}/api/supplier/restore/${id}`, {});
      message.success("Đã khôi phục thành công");
      fetchSuppliers();
    } catch (error) {
      message.error("Đã có lỗi xảy ra" + error);
    }
  };

  return {
    handleAddSupplier,
    handleEditSupplier,
    handleSubmit,
    handleDeleteSupplier,
    handleRestore,
  };
};

export default useSuppliersHandler;
