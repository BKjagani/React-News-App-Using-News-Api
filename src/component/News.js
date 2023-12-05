import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import debounce from "lodash/debounce";

export default function News(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let responce = await props.getData();
        let data = responce.data;
        const catchData = data.articles;

        setData(catchData);
      } catch (error) {
        console.log(error.message);
      }

      setIsLoading(false);
    };
    setIsLoading(true);
    fetchData();
  }, [props.category]);

  const fatchMore = async () => {
    setFetchLoading(true);
    let newPage = props.page + 1;
    try {
      const api = `https://newsapi.org/v2/top-headlines?country=${"in"}&category=${
        props.category
      }&apiKey=c75e17d2fe3147ffb1102ef15c0a92a4&page=${newPage}&pageSize=8`;
      props.setPage(newPage);
      let responce = await axios.get(api);
      let data = responce.data;
      let news = data.articles;
      setTimeout(() => {
        setData((prevData) => [...prevData, ...news]);
        console.log(news);
        setFetchLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMoreDebounced = debounce(fatchMore, 500);

  return (
    <div className="">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ColorRing
            visible={true}
            margin="0 auto"
            height="80"
            width="80"
            ariaLabel="loading-more"
            wrapperStyle={{}}
            wrapperClass="loading-more-wrapper"
            colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
          />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreDebounced}
          hasMore={data.length < 37}
        >
          <div className="container-fluid" style={{ marginTop: "80px" }}>
            <div className="row">
              {data.map((article, index) => {
                return (
                  <div
                    className="card col-md-3 p-2"
                    style={{ position: "relative" }}
                    key={index}
                  >
                    <span
                      className="badge bg-danger"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "-5px",
                        width: "fit-content",
                        fontSize: "14px",
                      }}
                    >
                      {article.source.name || ""}
                    </span>
                    <img
                      style={{ width: "286px", height: "158px" }}
                      src={
                        !article.urlToImage
                          ? "https://cdn.ndtv.com/common/images/ogndtv.png"
                          : article.urlToImage
                      }
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {article.title ? article.title : "Head Line"}
                      </h5>
                      <p className="card-text">
                        {article.description ? article.description : "...."}
                      </p>
                      <div
                        className="text-end dark mb-3"
                        style={{ color: "black", fontWeight: "500" }}
                      >
                        {`by -${article.author || article.source.name}`}
                      </div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                      >
                        Read more
                      </a>
                      <div className="mt-3">
                        {`PublishedAt:-  ${article.publishedAt}`}
                      </div>
                    </div>
                  </div>
                );
              })}
              {fetchLoading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    height: "fit-content",
                  }}
                >
                  <ColorRing
                    visible={true}
                    margin="0 auto"
                    height="80"
                    width="80"
                    ariaLabel="loading-more"
                    wrapperStyle={{}}
                    wrapperClass="loading-more-wrapper"
                    colors={[
                      "#b8c480",
                      "#B2A3B5",
                      "#F4442E",
                      "#51E5FF",
                      "#429EA6",
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
