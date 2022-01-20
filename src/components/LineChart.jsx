
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(moment(coinHistory?.data?.history[i].timestamp * 1000).format('MM/DD/YYYY'));
    }

    console.log(coinHistory?.data?.history);
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    return (
        <>
            <Row className="chart-header title">
                <Title level={2} className="chart-title head-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} />
        </>
    );
};

export default LineChart;
