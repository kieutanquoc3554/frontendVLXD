import { Table, Tabs } from "antd";
import ColumnsDebt from "./ColumnsDebt";
import ColumnSupplierDebt from "./ColumnSupplierDebt";

const { TabPane } = Tabs;

const TabsDebt = ({
  supplierDebt,
  debt,
  handleViewDetails,
  handleViewSupplierDebtDetails,
  filteredCustomerDebt,
  filteredSupplierDebt,
  isSearched,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane key="1" tab="Công nợ khách hàng">
        <Table
          dataSource={isSearched ? filteredCustomerDebt : debt}
          columns={ColumnsDebt(handleViewDetails)}
        />
      </TabPane>
      <TabPane key="2" tab="Công nợ nhà cung cấp">
        <Table
          dataSource={isSearched ? filteredSupplierDebt : supplierDebt}
          columns={ColumnSupplierDebt(handleViewSupplierDebtDetails)}
        />
      </TabPane>
    </Tabs>
  );
};

export default TabsDebt;
