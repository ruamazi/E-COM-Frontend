import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const MobileNav = ({ navDrawerOpen, setNavDrawerOpen, links }) => {
 return (
  <div
   className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-30
    ${navDrawerOpen ? "translate-x0" : "-translate-x-full"}`}
  >
   <div className="flex justify-end p-4">
    <button onClick={() => setNavDrawerOpen(false)}>
     <IoMdClose className="h-6 w-6 text-gray-600" />
    </button>
   </div>
   <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Menu</h2>
    {links.map((link) => (
     <nav key={link.name} className="mb-1">
      <Link
       to={link.to}
       onClick={() => setNavDrawerOpen(false)}
       className="block text-gray-600 hover:text-black"
      >
       {link.name}
      </Link>
     </nav>
    ))}
   </div>
  </div>
 );
};

export default MobileNav;
