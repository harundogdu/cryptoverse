import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { FooterArea, Sidebar, Main } from "components";
// pages
import {CryptoCurrencies , News ,Exchanges} from "pages";
/* function */
function App() {
  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sidebar />
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/currencies" element={<CryptoCurrencies />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/news" element={<News />} />
          </Routes>
          <FooterArea />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
