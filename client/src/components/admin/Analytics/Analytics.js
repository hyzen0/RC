import { Row, Col, TabPane } from "reactstrap";

const Analytics = props => {
  const { tabId } = props;
  return (
    <TabPane tabId={tabId}>
      <h1 className="text-white">Hello</h1>
    </TabPane>
  );
};

export default Analytics;
