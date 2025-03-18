import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/slices/productsSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
 const [searchTerm, setSearchTerm] = useState("");
 const [isOpen, setIsOpen] = useState(false);
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const handleSearch = (e) => {
  e.preventDefault();
  dispatch(setFilters({ search: searchTerm }));
  dispatch({
   type: "products/fetchProductsByFilter",
   payload: { search: searchTerm },
  });
  navigate(`/collections/all?search=${searchTerm}`);
  setIsOpen(false);
 };

 return (
  <div
   className={`flex items-center justify-center w-full transition-all duration-300
    ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-10" : "w-auto"}`}
  >
   {isOpen ? (
    <form
     onSubmit={handleSearch}
     className="relative flex items-center justify-center w-full"
    >
     <div className="relative w-1/2">
      <input
       type="text"
       onChange={(e) => setSearchTerm(e.target.value)}
       value={searchTerm}
       placeholder="Search..."
       className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full
       placeholder:text-gray-700"
      />
      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-800">
       <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
      </button>
     </div>
     <button
      onClick={() => setIsOpen(false)}
      type="button"
      className="absolute right-4 top-1/2 transform -translate-1/2 hover:text-gray-800"
     >
      <HiMiniXMark className="h-6 w-6 text-gray-700 " />
     </button>
    </form>
   ) : (
    <button onClick={() => setIsOpen((prev) => !prev)}>
     <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
    </button>
   )}
  </div>
 );
};

export default SearchBar;
