import { IoMdClose } from "react-icons/io";
import CartContent from "../cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, setDrawerOpen }) => {
 const { user, guestId } = useSelector((state) => state.auth);
 const { cart } = useSelector((state) => state.cart);
 const navigate = useNavigate();
 const userId = user ? user._id : null;

 const handleCheckout = () => {
  setDrawerOpen(false);
  if (!user) {
   navigate("/login?redirect=/checkout");
  } else {
   navigate("/checkout");
  }
 };

 return (
  <div
   className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-20
 ${drawerOpen ? "translate-x-0" : "translate-x-full"} `}
  >
   <div
    onClick={() => setDrawerOpen(false)}
    className="flex justify-end p-4 cursor-pointer"
   >
    <IoMdClose className="h-6 w-6 text-gray-600 hover:bg-red-500 rounded-full hover:text-white" />
   </div>
   <div className="flex-grow p-4 overflow-auto">
    <h2 className="text-xl font-semibold bg-4">Your Cart</h2>
    {cart && cart.products.length > 0 ? (
     <CartContent cart={cart} userId={userId} guestId={guestId} />
    ) : (
     <p className="text-sm text-gray-500 text-center mt-10">
      Your cart is empty.
     </p>
    )}
   </div>
   <div className="p-4 bg-white sticky bottom-0">
    {cart && cart.products.length > 0 ? (
     <div className="flex justify-between items-center mb-4 flex-col ">
      <div className="flex items-center justify-between w-full mb-2">
       <p className="text-lg font-semibold">Subtotal</p>
       <p className="text-lg font-semibold">
        ${cart.totalPrice?.toLocaleString()}
       </p>
      </div>
      <button
       onClick={handleCheckout}
       className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
       Checkout
      </button>
      <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
       Shipping, taxes and discount codes calculated at checkout.
      </p>
     </div>
    ) : null}
   </div>
  </div>
 );
};

export default CartDrawer;
