import { FiPhone } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";
import { LOGO_NAME } from "./Navbar";

const Footer = () => {
 const currentYear = new Date().getFullYear();

 const footer_links = [
  { to: "#", name: "Men's Top Wear" },
  { to: "#", name: "Men's Bottom wear" },
  { to: "#", name: "Women's Bottom wear" },
  { to: "#", name: "Women's Top Wear" },
 ];
 const support_links = [
  { to: "#", name: "Contact Us" },
  { to: "#", name: "About US" },
  { to: "#", name: "FAQs" },
  { to: "#", name: "Features" },
 ];
 const icons_links = [
  { to: "https://www.facebook.com", icon: <TbBrandMeta className="h-5 w-5" /> },
  {
   to: "https://www.instagram.com",
   icon: <IoLogoInstagram className="h-5 w-5" />,
  },
  {
   to: "https://x.com",
   icon: <RiTwitterXLine className="h-5 w-5" />,
  },
 ];

 return (
  <footer className="border-t py-12">
   <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
    <div>
     <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
     <p className="text-gray-500 mb-4 text-sm">
      Be the first to hear about products, exclusive events, and online offers.
     </p>
     <p className="font-medium text-gray-600 mb-6 text-sm">
      Sign up and get 10% off your first order.
     </p>
     <form className="flex">
      <input
       type="email"
       placeholder="Enter your Email"
       required
       className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
      />
      <button className="bg-black text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition-all">
       Subscribe
      </button>
     </form>
    </div>
    <div>
     <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
     <ul className="space-y-2 text-gray-600">
      {footer_links.map((link, i) => (
       <li key={i} className="text-sm">
        <Link to={link.to} className="hover:text-gray-500 transition-colors">
         {link.name}
        </Link>
       </li>
      ))}
     </ul>
    </div>
    <div>
     <h3 className="text-lg text-gray-800 mb-4">Support</h3>
     <ul className="space-y-2 text-gray-600">
      {support_links.map((link, i) => (
       <li key={i} className="text-sm">
        <Link to={link.to} className="hover:text-gray-500 transition-colors">
         {link.name}
        </Link>
       </li>
      ))}
     </ul>
    </div>
    <div>
     <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
     <div className="flex items-center gap-4 mb-6 text-gray-500">
      {icons_links.map((item, i) => (
       <a
        key={i}
        href={item.to}
        target="_blanc"
        rel="noopener noreferrer"
        className="hover:text-black"
       >
        {item.icon}
       </a>
      ))}
     </div>
     <h4 className="text-gray-600 mb-1">Call Us</h4>
     <p className="text-sm text-gray-600">
      <FiPhone className="h-4 w-4 inline-block mr-2" />
      +212 (653) 86-283
     </p>
    </div>
   </div>
   <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
    <p className="text-gray-500 text-sm text-center">
     &copy; {currentYear} {LOGO_NAME}. All rights reserved.
    </p>
   </div>
  </footer>
 );
};

export default Footer;
