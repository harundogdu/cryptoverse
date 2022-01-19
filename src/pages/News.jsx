import { Card, Col, Row } from "antd";
import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "services/newsApi";
import DefaultImage from "assets/images/default-image.jpg";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import { Select } from "antd";
import { useGetCryptosQuery } from "services/cryptoApi";
import Text from "antd/lib/typography/Text";

const News = ({ simplified = false }) => {
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  const [, setSearchCategory] = useState("");
  const [news, setNews] = useState([]);
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 100,
  });
  const { data: cryptoList } = useGetCryptosQuery(100);

  React.useEffect(() => {
    if (!isFetching) {
      setNews(data?.value);
    }
  }, [data?.value, isFetching]);

  const { Option } = Select;

  function onChange(value) {
    setNewsCategory(value);
  }

  function onSearch(val) {
    setSearchCategory(val);
  }

  if (isFetching) return "Loading...";

  return (
    <div
      className="site-card-wrapper"
      style={simplified ? { padding: 0 } : { padding: "10px" }}
    >
      {!simplified && (
        <>
          <Select
            showSearch
            placeholder="Select a crypto category"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            style={{ width: 400 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {cryptoList?.data?.coins?.map((currency) => (
              <Option key={currency.uuid} value={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
          {newsCategory && (
            <div>
              <Text
                type="success"
                strong
                style={{ display: "inline-block", fontSize: "24px" }}
              >
                Resulst for {newsCategory}
              </Text>
            </div>
          )}
        </>
      )}
      <Row gutter={[16, 16]} className="crypto-card-container">
        {news.length > 0 &&
          news.map((newcrypto, index) => (
            <Col span={24} key={index}>
              <a href={newcrypto.url} target={"_blank"} rel="noreferrer">
                <Card title={`${newcrypto.name}`} hoverable>
                  <div className="news-card">
                    <div className="new-card-content">
                      <img
                        className="news-image"
                        src={
                          newcrypto.image?.thumbnail?.contentUrl || DefaultImage
                        }
                        alt="iconUrl"
                      />
                      <div className="new-card-footer">
                        <p>{newcrypto.description}</p>
                        <Meta
                          title={newcrypto.provider[0]?.name}
                          description={moment(newcrypto.datePublished)
                            .startOf("ss")
                            .fromNow()}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default News;
