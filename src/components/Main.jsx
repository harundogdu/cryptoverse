import { Content } from "antd/lib/layout/layout";
import React from "react";

const Main = ({ children }) => {
  return (
    <div className="main">
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        {children}
      </Content>
    </div>
  );
};

export default Main;
