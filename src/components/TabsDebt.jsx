import { Table, Tabs } from "antd";
import ColumnsDebt from "./ColumnsDebt";

const { TabPane } = Tabs;

const TabsDebt = ({ debt, handleViewDetails }) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane key="1" tab="Công nợ khách hàng">
        <Table dataSource={debt} columns={ColumnsDebt(handleViewDetails)} />
      </TabPane>
      <TabPane key="2" tab="Công nợ nhà cung cấp"></TabPane>
    </Tabs>
  );
};

export default TabsDebt;
