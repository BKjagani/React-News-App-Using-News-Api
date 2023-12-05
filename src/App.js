import { useEffect, useState, useCallback } from "react";
import Navbar from "./component/Navbar";
import axios from "axios";
import News from "./component/News";
// import { ColorRing } from "react-loader-spinner";

function App() {
  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);

  const API = `https://newsapi.org/v2/top-headlines?country=${"in"}&category=${category}&apiKey=c75e17d2fe3147ffb1102ef15c0a92a4&page=${page}&pageSize=8`;

  const getData = useCallback(async () => {
    try {
      return await axios.get(API);
    } catch (error) {
      console.log(error.message);
    }
  }, [API]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData();
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [category, getData]);

  return (
    <>
      <Navbar setCategory={setCategory} category={category}/>
      <News
        getData={getData}
        category={category}
        setPage={setPage}
        page={page}
      />
    </>
  );
}

export default App;
