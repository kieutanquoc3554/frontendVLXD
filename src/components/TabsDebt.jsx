import { Table, Tabs } from "antd";
import ColumnsDebt from "./ColumnsDebt";
import ColumnSupplierDebt from "./ColumnSupplierDebt";

const { TabPane } = Tabs;

const TabsDebt = ({
  supplierDebt,
  debt,
  handleViewDetails,
  handleViewSupplierDebtDetails,
}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane key="1" tab="Công nợ khách hàng">
        <Table dataSource={debt} columns={ColumnsDebt(handleViewDetails)} />
      </TabPane>
      <TabPane key="2" tab="Công nợ nhà cung cấp">
        <Table
          dataSource={supplierDebt}
          columns={ColumnSupplierDebt(handleViewSupplierDebtDetails)}
        />
      </TabPane>
    </Tabs>
  );
};

export default TabsDebt;
