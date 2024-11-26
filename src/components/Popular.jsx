import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa6";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../utils/axios";
import Card from "./Card";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [mediaType, setMediaType] = useState("movie");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPopularData = async () => {
    try {
      const { data } = await axios.get(`/${mediaType}/popular?page=${page}`);
      console.log(data.results);

      setPopular((prevPopular) => [...prevPopular, ...data.results]);
      setPage(page + 1)
      if (data.results.length === 0) setHasMore(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetPopularData();
    console.log('media type changed');

  }, [mediaType]);

  return (
    <div className="w-full min-h-screen bg-[#1f1e24]">
      <div className="flex items-center justify-between px-10">
        <h1 className="text-2xl font-semibold text-zinc-200 flex items-center gap-2">
          <Link to={"/"}>
            <FaArrowLeft />
          </Link>
          Popular
        </h1>
        <TopNav />
        <div className="flex gap-4">
        <Dropdown
            title={"filter"}
            options={["tv", "movie", "all"]}
            value={mediaType} // Bind the dropdown to the category state
            fn={(e) => setMediaType(e.target.value)}
          />

        </div>
      </div>
      <InfiniteScroll
        className="flex flex-wrap gap-5 justify-center my-10 px-5"
        dataLength={popular.length}
        next={GetPopularData}
        hasMore={hasMore}
        loader={<Shimmer />}
      >
        {popular.length > 0 ? popular.map((item, index) => (
          <Link key={index} to={`/trending/${mediaType}/${item.id}`}> <Card item={item} /></Link>
        )) : <Shimmer count={6} />}
      </InfiniteScroll>

      {/* Move to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-10 right-10 bg-[#6556CD] text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none group"
      >
        <FaArrowUp className="group-hover:rotate-[360deg] transition-all duration-700" />
      </button>
    </div>
  );
};

export default Popular;
