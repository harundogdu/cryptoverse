import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Loading from "components/Loading";
import millify from "millify";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} from "services/cryptoApi";
import { Col, Row, Select } from "antd";
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";
import LineChart from "components/LineChart";

const CryptoDetails = () => {
    const { Option } = Select;
    const { coinId } = useParams();
    const [periods, setPeriods] = useState('7d');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const crypto = data?.data?.coin;
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod: periods });
    const timePeriods = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        {
            title: "Price to USD",
            value: `$ ${crypto?.price && millify(crypto?.price)}`,
            icon: <DollarCircleOutlined />,
        },
        { title: "Rank", value: crypto?.rank, icon: <NumberOutlined /> },
        {
            title: "24h Volume",
            value: `$ ${crypto?.["24hVolume"] && millify(crypto?.["24hVolume"])}`,
            icon: <ThunderboltOutlined />,
        },
        {
            title: "Market Cap",
            value: `$ ${crypto?.marketCap && millify(crypto?.marketCap)}`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: "All-time-high(daily avg.)",
            value: `$ ${crypto?.allTimeHigh?.price && millify(crypto?.allTimeHigh?.price)
                }`,
            icon: <TrophyOutlined />,
        },
    ];
    const genericStats = [
        {
            title: "Number Of Markets",
            value: crypto?.numberOfMarkets,
            icon: <FundOutlined />,
        },
        {
            title: "Number Of Exchanges",
            value: crypto?.numberOfExchanges,
            icon: <MoneyCollectOutlined />,
        },
        {
            title: "Aprroved Supply",
            value: crypto?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Total Supply",
            value: `$ ${crypto?.supply?.total && millify(crypto?.supply?.total)}`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Circulating Supply",
            value: `$ ${crypto?.supply?.circulating && millify(crypto?.supply?.circulating)
                }`,
            icon: <ExclamationCircleOutlined />,
        },
    ];

    React.useEffect(() => {
        setPeriods(periods);
    },[periods])

    if (isFetching) return <Loading />;

    return (
        <div className="site-detail-wrapper">
            <div className="header">
                <Title level={2} style={{ color: crypto.color }}>
                    {crypto.name} ({" "}
                    {crypto.name.toLowerCase() + " - " + crypto.symbol.toLowerCase()} )
                    Price
                </Title>
                <p>
                    {crypto.name} live price in US Dollar (USD), View value statics,
                    market cap and supply
                </p>
            </div>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <div className="select">
                        <Select
                            defaultValue="7d"
                            style={{ width: 240 }}
                            onChange={value => setPeriods(value)}
                        >
                            {timePeriods.map((period, index) => (
                                <Option value={period} key={index}>
                                    {period}
                                </Option>
                            ))}
                        </Select>
                    </div>

                </div>
                <div className="chart">
                    <LineChart
                        coinHistory={coinHistory}
                        currentPrice={millify(crypto.price)}
                        coinName={crypto.name}
                    />
                </div>
            </div>
            <div className="statistics">
                <Row className="container">
                    <Col span={11}>
                        <Title className="head-title" level={3}>
                            {crypto.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the statistics of {crypto.name}, such as the
                            base and quote currency, the rank, and trading volume.
                        </p>
                        {stats.map(({ icon, title, value }) => (
                            <Col className="coin-stats" key={title}>
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                    <Col span={11} className="other-stats-info">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading head-title">
                                Other Stats Info
                            </Title>
                            <p>
                                An overview showing the statistics of {crypto.name}, such as the
                                base and quote currency, the rank, and trading volume.
                            </p>
                        </Col>
                        {genericStats.map(({ icon, title, value }) => (
                            <Col className="coin-stats" key={title}>
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Row>
                    <Col span={11}>
                        <Title className="head-title" level={3}>
                            What is the {crypto.name}?
                        </Title>
                        {HTMLReactParser(crypto?.description)}
                    </Col>
                    <Col span={11}>
                        <Title className="head-title" level={3}>
                            {crypto.name} Links
                        </Title>
                        {crypto.links.map((link, index) => (
                            <Col className="coin-stats" key={index}>
                                <Col className="coin-stats-name">
                                    <Text style={{ textTransform: "capitalize" }}>
                                        {link.type}
                                    </Text>
                                </Col>
                                <a href={link.url} target={"_blank"} rel="noreferrer">
                                    {link.name}
                                </a>
                            </Col>
                        ))}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CryptoDetails;
