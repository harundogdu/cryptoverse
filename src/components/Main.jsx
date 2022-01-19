import { Content } from "antd/lib/layout/layout";
import React from "react";

const Main = ({ children }) => {
  return (
    <div className="main">
      <Content>
        {children}
      </Content>
    </div>
  );
};

export default Main;
