import { Link, NavLink, useNavigate } from "react-router-dom";
import { LOGO_NAME } from "../../components/common/Navbar";
import { FaBoxOpen, FaSignOutAlt, FaStore, FaUser } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { IoCreateSharp } from "react-icons/io5";

const AdminSidebar = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const sidebarLinks = [
  {
   name: "Products",
   to: "/admin/products",
   icon: <FaBoxOpen />,
  },
  {
   name: "Orders",
   to: "/admin/orders",
   icon: <FaClipboardList />,
  },
  {
   name: "Users",
   to: "/admin/users",
   icon: <FaUser />,
  },
  {
   name: "Create Product",
   to: "/admin/create-product",
   icon: <IoCreateSharp size={18} />,
  },
  {
   name: "Shop",
   to: "/",
   icon: <FaStore />,
  },
 ];

 const handleLogout = () => {
  dispatch(logout());
  dispatch(clearCart());
  navigate("/");
 };

 return (
  <div className="p-6">
   <div className="mb-6">
    <Link to={"/admin"} className="text-2xl font-medium">
     {LOGO_NAME}
    </Link>
   </div>
   <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
   <nav className="flex flex-col space-y-2">
    {sidebarLinks.map((link) => (
     <NavLink
      key={link.name}
      to={link.to}
      className={({ isActive }) =>
       `py-3 px-4 rounded flex items-center space-x-2 ${
        isActive
         ? "bg-gray-700 text-white"
         : "text-gray-300 hover:bg-gray-700 hover:text-white"
       }`
      }
     >
      {link.icon}
      <span>{link.name}</span>
     </NavLink>
    ))}
   </nav>
   <div className="mt-6">
    <button
     onClick={handleLogout}
     className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
    >
     <FaSignOutAlt />
     <span>Logout</span>
    </button>
   </div>
  </div>
 );
};

export default AdminSidebar;
