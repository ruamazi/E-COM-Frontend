import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";

export const LOGO_NAME = "E-COM";

const Navbar = () => {
 const [drawerOpen, setDrawerOpen] = useState(false);
 const [navDrawerOpen, setNavDrawerOpen] = useState(false);
 const { cart } = useSelector((state) => state.cart);
 const { user } = useSelector((state) => state.auth);

 const totalCartItems = cart?.products?.reduce(
  (total, product) => total + product.quantity,
  0
 );

 const links = [
  { to: "/collections/all?gender=Men", name: "men" },
  { to: "/collections/all?gender=Women", name: "women" },
  { to: "/collections/all?category=Top%20Wear", name: "top wear" },
  {
   to: "/collections/all?category=Bottom%20Wear",
   name: "bottom wear",
  },
 ];

 return (
  <>
   <nav className="container mx-auto flex items-center justify-between py-4 px-6">
    <Link to={"/"} className="text-2xl font-medium">
     {LOGO_NAME}
    </Link>
    <div className="hidden md:flex space-x-6">
     {links.map((each, i) => (
      <Link
       key={i}
       to={each.to}
       className="text-gray-700 hover:text-black text-sm font-medium uppercase"
      >
       {each.name}
      </Link>
     ))}
    </div>
    <div className="flex items-center space-x-4">
     {user?.role === "admin" && (
      <Link
       to={"/admin"}
       className="block bg-black px-2 rounded text-sm text-white"
      >
       Dashboard
      </Link>
     )}
     <Link to={"/profile"} className="hover:text-black">
      <HiOutlineUser className="h-6 w-6 text-gray-700" />
     </Link>
     <button
      onClick={() => setDrawerOpen(true)}
      className="relative hover:text-black"
     >
      <HiOutlineShoppingCart className="h-6 w-6 text-gray-700" />
      {totalCartItems > 0 && (
       <span className=" absolute bg-red-400 text-white text-xs rounded-full px-[5px] top-[-8px]">
        {totalCartItems}
       </span>
      )}
     </button>
     <div className=" overflow-hidden">
      <SearchBar />
     </div>
     <button
      onClick={() => setNavDrawerOpen((prev) => !prev)}
      className="md:hidden"
     >
      <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
     </button>
    </div>
   </nav>
   <CartDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
   <MobileNav
    navDrawerOpen={navDrawerOpen}
    setNavDrawerOpen={setNavDrawerOpen}
    links={links}
   />
  </>
 );
};

export default Navbar;
