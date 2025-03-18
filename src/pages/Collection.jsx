import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/FilterSidebar";
import SortOptions from "../components/products/SortOptions";
import ProductGrid from "../components/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../redux/slices/productsSlice";

const Collection = () => {
 const { collection } = useParams();
 const [searchParams] = useSearchParams();
 const [sidebarOpen, setSidebarOpen] = useState(false);
 const sidebarRef = useRef(null);
 const { products, loading, error } = useSelector((state) => state.products);
 const queryParams = Object.fromEntries([...searchParams]);
 const dispatch = useDispatch();

 const toggleSidebar = () => {
  setSidebarOpen((prev) => !prev);
 };

 const handleClickOutside = (e) => {
  if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
   setSidebarOpen(false);
  }
 };
 useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, []);

 useEffect(() => {
  dispatch(
   fetchProductsByFilter({
    collection,
    ...queryParams,
   })
  );
 }, [dispatch, collection, searchParams]);

 return (
  <div className="flex flex-col lg:flex-row">
   <button
    onClick={toggleSidebar}
    className="lg:hidden border p-2 flex justify-center items-center"
   >
    <FaFilter className="mb-2" /> Filters
   </button>
   {/* Filter Sidebar */}
   <div
    ref={sidebarRef}
    className={`fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-auto transition-transform duration-300 lg:static lg:translate-x-0 ${
     sidebarOpen ? "translate-x-0" : "-translate-x-full"
    }`}
   >
    <FilterSidebar />
   </div>
   <div className="flex-grow p-4">
    <h2 className="text-2xl uppercase mb-4">All Collection</h2>
    {/* Sort Options */}
    <SortOptions />
    {/* Product Grid */}
    <ProductGrid products={products} loading={loading} error={error} />
   </div>
  </div>
 );
};

export default Collection;
