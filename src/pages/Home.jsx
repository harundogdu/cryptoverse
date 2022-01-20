import { Col, Row, Statistic } from "antd";
import Title from "antd/lib/typography/Title";
import { Main } from "components";
import Loading from "components/Loading";
import millify from "millify";
import { CryptoCurrencies, News } from "pages";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "services/cryptoApi";
const Home = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loading />;
  return (
    <Main>
      <div className="home-container">
        {error && <div>{error.message}</div>}
        <Title level={3} className="title">
          The Global Stats
        </Title>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.total}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap:"
              value={`$${millify(globalStats.totalMarketCap)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24h Volume"
              value={`$${millify(globalStats.total24hVolume)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.total}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
            />
          </Col>
        </Row>
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Top 10 Cryptos In The World
          </Title>
          <Title level={4} className="show-more">
            <Link to="/cryptocurrencies">Show more</Link>
          </Title>
        </div>
        <CryptoCurrencies simplified />
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Latest Crypto News
          </Title>
          <Title level={4} className="show-more">
            <Link to="/news">Show more</Link>
          </Title>
        </div>
        <News simplified />
      </div>
    </Main>
  );
};

export default Home;
