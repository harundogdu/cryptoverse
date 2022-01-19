import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { useGetCryptosQuery } from "services/cryptoApi";
import millify from "millify";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Search from "antd/lib/transfer/search";

const CryptoCurrencies = ({ simplified = false }) => {
  const { data, isFetching } = useGetCryptosQuery(simplified ? 10 : 100);
  const [coinList, setCoinList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isFetching) {
      const coins = data?.data?.coins;
      if (search !== "") {
        const filteredData = coins?.filter((coin) => {
          return coin.name.toLowerCase().includes(search.toLowerCase());
        });
        setCoinList(filteredData);
        return;
      }
      setCoinList(coins);
    }
  }, [data?.data?.coins, isFetching, search]);

  if (isFetching) return "Loading...";
  return (
    <div
      className="site-card-wrapper"
      style={simplified ? { padding: 0 } : { padding: "10px" }}
    >
      {!simplified && (
        <div className="search-bar">
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a coin"
            size="large"
            loading
          />
        </div>
      )}
      <Row gutter={[16, 16]} className="crypto-card-container">
        {coinList.map((currency) => (
          <Col span={6} key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="iconUrl"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <Statistic
                  title="Daily Change"
                  value={currency.change}
                  precision={2}
                  valueStyle={
                    currency.change > 0 ? { color: "green" } : { color: "red" }
                  }
                  prefix={
                    currency.change > 0 ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
                  suffix="%"
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CryptoCurrencies;
