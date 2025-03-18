import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";

const NewArrivals = () => {
 const scrollRef = useRef(null);
 const [isDragging, setIsDragging] = useState(false);
 const [startX, setStartX] = useState(0);
 const [scrollLeft, setScrollLeft] = useState(false);
 const [canScrollRight, setCanScrollRight] = useState(true);
 const [canScrollLeft, setCanScrollLeft] = useState(false);
 const [newArrivals, setNewArrivals] = useState([]);

 const scroll = (direction) => {
  const scrollAmount = direction === "left" ? -300 : 300;
  scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
 };

 const updateScrollBtn = () => {
  const container = scrollRef.current;
  if (container) {
   const leftScroll = container.scrollLeft;
   const rightScrollable =
    container.scrollWidth > leftScroll + container.clientWidth;
   setCanScrollLeft(leftScroll > 0);
   setCanScrollRight(rightScrollable);
  }
 };

 const handleMouseDown = (e) => {
  setIsDragging(true);
  setStartX(e.pageX - scrollRef.current.offsetLeft);
  setScrollLeft(scrollRef.current.scrollLeft);
 };
 const handleMouseMove = (e) => {
  if (!isDragging) return;
  const x = e.pageX - scrollRef.current.offsetLeft;
  const walk = x - startX;
  scrollRef.current.scrollLeft = scrollLeft - walk;
 };
 const handleMouseUpLeave = () => {
  setIsDragging(false);
 };

 const fetchNewArrivals = async () => {
  try {
   const response = await axios.get(`${API_URL}/api/products/new-arrivals`);
   setNewArrivals(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  fetchNewArrivals();
  const container = scrollRef.current;
  if (container) {
   container.addEventListener("scroll", updateScrollBtn);
   updateScrollBtn();
   return () => container.removeEventListener("scroll", updateScrollBtn);
  }
 }, []);

 return (
  <section className="py-16 px-4 lg:px-0">
   <div className="container mx-auto text-center mb-10 relative">
    <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
    <p className="text-lg text-gray-600 mb-8">
     Discover the latest styles straight off the runway, freshly added to keep
     your wardrobe on the cutting edge of fashion.
    </p>
    <div className=" absolute right-0 bottom-[-30px] flex space-x-2">
     <button
      onClick={() => scroll("left")}
      disabled={!canScrollLeft}
      className="p-2 rounded border bg-white text-black disabled:bg-gray-200 disabled:text-gray-500"
     >
      <FiChevronLeft className="text-2xl" />
     </button>
     <button
      onClick={() => scroll("right")}
      disabled={!canScrollRight}
      className="p-2 rounded border bg-white text-black disabled:bg-gray-200 disabled:text-gray-500"
     >
      <FiChevronRight className="text-2xl" />
     </button>
    </div>
   </div>

   <div
    ref={scrollRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUpLeave}
    onMouseLeave={handleMouseUpLeave}
    className={`container mx-auto overflow-x-scroll flex space-x-6 relative
    ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
   >
    {newArrivals.map((item) => (
     <div
      key={item._id}
      className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
     >
      <img
       src={item.images[0]?.url}
       alt={item.images[0]?.altText || item.name}
       draggable={false}
       className="w-full h-[500px] object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
       <Link to={`/product/${item._id}`} className="block">
        <h4 className="font-medium">{item.name}</h4>
        <p className="mt-1">${item.price}</p>
       </Link>
      </div>
     </div>
    ))}
   </div>
  </section>
 );
};

export default NewArrivals;
