import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
 const [searchParams, setSearchParaams] = useSearchParams();
 const navigate = useNavigate();
 const [filters, setFilters] = useState({
  category: "",
  gender: "",
  color: "",
  size: [],
  material: [],
  brand: [],
  minPrice: 0,
  maxPrice: 100,
 });
 const [priceRange, setPriceRange] = useState([0, 100]);

 const handleFilterChange = (e) => {
  const { name, value, checked, type } = e.target;
  let newFilters = { ...filters };
  if (type === "checkbox") {
   if (checked) {
    newFilters[name] = [...(newFilters[name] || []), value];
   } else {
    newFilters[name] = newFilters[name].filter((item) => item !== value);
   }
  } else {
   newFilters[name] = value;
  }
  setFilters(newFilters);
  updateUrlParams(newFilters);
 };

 const updateUrlParams = (newFilters) => {
  const params = new URLSearchParams();
  Object.keys(newFilters).forEach((key) => {
   if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
    params.append(key, newFilters[key].join(","));
   } else if (newFilters[key]) {
    params.append(key, newFilters[key]);
   }
  });
  setSearchParaams(params);
  navigate(`?${params.toString()}`);
 };

 const handlePriceChange = (e) => {
  const newPrice = e.target.value;
  setPriceRange([0, newPrice]);
  const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
  setFilters(filters);
  updateUrlParams(newFilters);
 };

 useEffect(() => {
  const params = Object.fromEntries([...searchParams]);
  setFilters({
   category: params.category || "",
   gender: params.gender || "",
   color: params.color || "",
   size: params.size ? params.size.split(",") : [],
   material: params.material ? params.material.split(",") : [],
   brand: params.brand ? params.brand.split(",") : [],
   minPrice: params.minPrice || 0,
   maxPrice: params.maxPrice || 100,
  });
  setPriceRange([params.minPrice, params.maxPrice || 100]);
 }, [searchParams]);

 return (
  <div className="p-4">
   <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
   {/* Category Filter */}
   <div className="mb-6">
    <label className="block text-gray-600 font-medium mb-2">Category</label>
    {categories.map((cat) => (
     <div key={cat} className="flex items-center mb-1">
      <input
       type="radio"
       name="category"
       value={cat}
       onChange={handleFilterChange}
       checked={filters.category === cat}
       className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
      />
      <span className="text-gray-700">{cat}</span>
     </div>
    ))}
   </div>

   {/* Gender Filter */}
   <div className="mb-6">
    <label className="block text-gray-600 font-medium mb-2">Gender</label>
    {genders.map((ge) => (
     <div key={ge} className="flex items-center mb-1">
      <input
       type="radio"
       name="gender"
       value={ge}
       onChange={handleFilterChange}
       checked={filters.gender === ge}
       className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
      />
      <span className="text-gray-700">{ge}</span>
     </div>
    ))}
   </div>

   {/* Color Filter */}
   <div className="mb-4">
    <label className="block text-gray-600 font-medium mb-2">Color</label>
    <div className="flex flex-wrap gap-2">
     {colors.map((color) => (
      <button
       key={color}
       name="color"
       value={color}
       onClick={handleFilterChange}
       className={` w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105
        ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
       style={{ backgroundColor: color.toLowerCase() }}
      ></button>
     ))}
    </div>
   </div>

   {/* Size Filter */}
   <div className="mb-6">
    <label className="block text-gray-600 font-medium mb-2">Size</label>
    {sizes.map((size) => (
     <div key={size} className="flex items-center mb-1">
      <input
       type="checkbox"
       name="size"
       value={size}
       onChange={handleFilterChange}
       checked={filters.size.includes(size)}
       className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
      />
      <span className="text-gray-700">{size}</span>
     </div>
    ))}
   </div>

   {/* Material Filter */}
   <div className="mb-6">
    <label className="block text-gray-600 font-medium mb-2">Material</label>
    {materials.map((mat) => (
     <div key={mat} className="flex items-center mb-1">
      <input
       type="checkbox"
       name="material"
       value={mat}
       onChange={handleFilterChange}
       checked={filters.material.includes(mat)}
       className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
      />
      <span className="text-gray-700">{mat}</span>
     </div>
    ))}
   </div>

   {/* Brand Filter */}
   <div className="mb-6">
    <label className="block text-gray-600 font-medium mb-2">Brand</label>
    {brands.map((brand) => (
     <div key={brand} className="flex items-center mb-1">
      <input
       type="checkbox"
       name="brand"
       value={brand}
       onChange={handleFilterChange}
       checked={filters.brand.includes(brand)}
       className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
      />
      <span className="text-gray-700">{brand}</span>
     </div>
    ))}
   </div>
   {/* Price Range filter */}
   <div className="mb-8"></div>
   <label className="block text-gray-600 font-medium mb-2">Price Range</label>
   <input
    type="range"
    name="priceRange"
    min={0}
    max={100}
    value={priceRange[1]}
    onChange={handlePriceChange}
    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
   />
   <div className="flex justify-between text-gray-600 mt-2">
    <span>$0</span>
    <span>${priceRange[1]}</span>
   </div>
  </div>
 );
};

const categories = ["Top Wear", "Bottom Wear"];
const colors = [
 "black",
 "white",
 "red",
 "green",
 "blue",
 "yellow",
 "cyan",
 "magenta",
 "orange",
 "purple",
 "pink",
 "brown",
 "gray",
 "silver",
 "gold",
 "teal",
 "navy",
 "maroon",
 "lime",
 "olive",
 "violet",
 "indigo",
 "coral",
 "turquoise",
 "skyblue",
];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const materials = [
 "Cotton",
 "Wool",
 "Denim",
 "Polyester",
 "Silk",
 "Linen",
 "Viscose",
 "Fleece",
];
const brands = [
 "Urban Threads",
 "Modern Fit",
 "Street Style",
 "Beach Breeze",
 "Fashionista",
 "ChicStyle",
];
const genders = ["Men", "Women"];

export default FilterSidebar;
