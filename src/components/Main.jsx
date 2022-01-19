import { Content, Header } from "antd/lib/layout/layout";
import React from "react";

const Main = () => {
  return (
    <>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, textAlign: "center" }}
        >
          content
        </div>
      </Content>
    </>
  );
};

export default Main;
