import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import axios from "../utils/axios";
import Card from "./Card";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa"; // Import the arrow icon for "Move to Top"
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Shimmer from "./Shimmer";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [timeWindow, setTimeWindow] = useState("day");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  document.title = "JDMovies | Trending " + category.toUpperCase();

  const GetTrendingData = async () => {
    try {
      const { data } = await axios.get(
        `trending/${category}/${timeWindow}?page=${page}`
      );
      setTrending((prevTrending) => [...prevTrending, ...data.results]);
      setPage(page + 1);
      if (data.results.length === 0) setHasMore(false);
      // console.log(data.results);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    setTrending([]); // Clear data on filter change
    setHasMore(true); // Reset hasMore state
    setPage(1); // Reset page to 1 on filter change
    GetTrendingData();
  }, [category, timeWindow]);

  

  return (
    <div className="w-full min-h-screen bg-[#1f1e24]">
      <div className="flex items-center justify-between px-10">
        <h1 className="text-2xl font-semibold text-zinc-200 flex items-center gap-2">
          <Link to={"/"}>
            <FaArrowLeft />
          </Link>
          Trending
        </h1>
        <TopNav />
        <div className="flex gap-4">
          <Dropdown
            title={"filter"}
            options={["tv", "movie", "all"]}
            value={category} // Bind the dropdown to the category state
            fn={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            title={"filter"}
            options={["day", "week"]}
            value={timeWindow} // Bind the dropdown to the timeWindow state
            fn={(e) => setTimeWindow(e.target.value)}
          />
        </div>
      </div>
      {trending.length ? (
        <div>
          <InfiniteScroll
            dataLength={trending.length}
            next={GetTrendingData}
            hasMore={hasMore}
            loader={<Shimmer />}
            className="flex flex-wrap gap-5 justify-center my-10 px-5"
          >
            {trending.map((item, index) => (
              <Link key={index} to={`/trending/${item.media_type}/${item.id}`}>
                <Card key={index} item={item} />
              </Link>
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <Shimmer count={6} />
      )}

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

export default Trending;
