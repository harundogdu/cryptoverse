import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { FooterArea, Sidebar } from "components";
// pages
import { Home, CryptoCurrencies, News, Exchanges, CryptoDetails } from "pages";
/* function */
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout hasSider>
          <Sidebar />
          <Layout className="site-layout" style={{ marginLeft: 250 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/currencies" element={<CryptoCurrencies />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/news" element={<News />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            </Routes>
            <FooterArea />
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
