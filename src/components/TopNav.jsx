import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const GetSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${inputValue}`);
      setSearchResults(data.results);
      console.log(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearch();
  }, [inputValue]);

  // console.log(searchResults);

  return (
    <div className="flex gap-7  items-center p-6 text-xl ml-[15%] relative">
      <FiSearch className="text-2xl text-zinc-400 " />
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="w-[50%] bg-transparent outline-none text-zinc-300"
        type="text"
        placeholder="Search anything..."
      />
      {inputValue && (
        <RxCross2
          onClick={() => setInputValue("")}
          className="text-3xl text-zinc-400 "
        />
      )}

      <div className="min-w-[55%] max-h-[50vh] bg-zinc-200 absolute top-[90%] overflow-auto rounded-b-lg">
        {searchResults.map((item, index) => (
          <Link key={index} to={`/search/${item.media_type}/${item.id}`}
            className="w-full flex items-center gap-10 p-3 text-zinc-600 border-b-2 border-zinc-100 font-semibold hover:text-black hover:bg-zinc-300 duration-300  "
            href=""
          >
            {item.backdrop_path || item.profile_path ? (
              <img
                className="w-28 h-24 rounded-md"
                src={`https://image.tmdb.org/t/p/original${
                  item.backdrop_path || item.profile_path
                }`}
                alt=""
              />
            ) : (
              <img
                className="w-28 h-24"
                src={
                  "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                }
              />
            )}
            <span>{item.name || item.original_name || item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
