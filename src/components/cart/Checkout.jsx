import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalBtn from "./PayPalBtn";
import { useDispatch, useSelector } from "react-redux";
import {
 createCheckout,
 finalizeCheckout,
} from "../../redux/slices/checkoutSlice";
import axios from "axios";
import { API_URL, sendTokenHeader } from "../../constants";
import Loader from "../common/Loader";

const Checkout = () => {
 const [shippingAdress, setShippingAdress] = useState({
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  phone: "",
 });
 const [checkoutId, setCheckoutId] = useState(null);
 const { cart, loading, error } = useSelector((state) => state.cart);

 const { user } = useSelector((state) => state.auth);
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const handleCreateCheckout = async (e) => {
  e.preventDefault();
  // Ensure the cart has products before proceeding
  if (cart && cart.products.length > 0) {
   try {
    // Dispatch the createCheckout action
    const resp = await dispatch(
     createCheckout({
      checkoutItems: cart.products,
      shippingAddress: shippingAdress,
      paymentMethod: "Paypal",
      totalPrice: cart.totalPrice,
     })
    );
    // Check if the response payload contains an _id and set the checkoutId
    if (resp.payload && resp.payload._id) {
     setCheckoutId(resp.payload._id);
    } else {
     // Handle the case where there is no _id in the response
     console.error("Checkout creation failed: Missing _id in response");
    }
   } catch (error) {
    // Handle any errors that occurred during the dispatch
    console.error("Error creating checkout:", error);
   }
  } else {
   // Handle the case where the cart is empty
   console.log("Cart is empty. Cannot create checkout.");
  }
 };

 const handlePaymentSuccess = async (orderDetails) => {
  try {
   // Sending the payment status update via Axios
   const response = await axios.put(
    `${API_URL}/api/checkout/update/${checkoutId}`,
    {
     paymentStatus: "Paid",
     paymentDetails: orderDetails,
    },
    sendTokenHeader
   );
   // Check the response status and handle success or failure
   if (response.status === 200) {
    // Dispatch the finalizeCheckout action if the update was successful
    try {
     await dispatch(finalizeCheckout(checkoutId));
     navigate("/order-confirmation");
    } catch (err) {
     console.error("Error finalizing checkout:", err);
    }
   } else {
    console.error("Payment update failed with status:", response.status);
   }
  } catch (error) {
   // Catching errors from the axios request
   console.error("Error updating payment status:", error);
  }
 };

 useEffect(() => {
  if (!cart || cart.products.length === 0) {
   navigate("/");
  }
 }, [cart, navigate]);

 if (loading) return <Loader />;
 if (error) return <p className="text-center">Error: {error}</p>;
 if (!cart || !cart.products || cart.products.length === 0) {
  return <p className="text-center">No products in cart.</p>;
 }

 return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
   {/* Left Section */}
   <div className="bg-white rounded-lg p-6">
    <h2 className="text-2xl uppercase mb-6">checkout</h2>
    <form onSubmit={handleCreateCheckout}>
     <h3 className="text-lg mb-4">Contact Details</h3>
     <div className="mb-4">
      <label className="block text-gray-700">Email</label>
      <input
       type="email"
       value={user.email || ""}
       className="w-full p-2 border border-gray-300 rounded"
       disabled
      />
     </div>
     <h3 className="text-lg mb-4">Delivery</h3>
     <div className="mb-4 grid grid-cols-2 gap-4">
      <div>
       <label className="block text-gray-700">First Name</label>
       <input
        type="text"
        value={shippingAdress.firstName}
        onChange={(e) =>
         setShippingAdress({ ...shippingAdress, firstName: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded"
        required
       />
      </div>
      <div>
       <label className="block text-gray-700">Last Name</label>
       <input
        type="text"
        value={shippingAdress.lastName}
        onChange={(e) =>
         setShippingAdress({ ...shippingAdress, lastName: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded"
        required
       />
      </div>
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">Adress</label>
      <input
       type="text"
       value={shippingAdress.address}
       onChange={(e) =>
        setShippingAdress({ ...shippingAdress, address: e.target.value })
       }
       className="w-full p-2 border border-gray-300 rounded"
       required
      />
     </div>
     <div className="mb-4 grid grid-cols-2 gap-2">
      <div>
       <label className="block text-gray-700">City</label>
       <input
        type="text"
        value={shippingAdress.city}
        onChange={(e) =>
         setShippingAdress({ ...shippingAdress, city: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded"
        required
       />
      </div>
      <div>
       <label className="block text-gray-700">Postal Code</label>
       <input
        type="text"
        value={shippingAdress.postalCode}
        onChange={(e) =>
         setShippingAdress({ ...shippingAdress, postalCode: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded"
        required
       />
      </div>
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">Country</label>
      <input
       type="text"
       value={shippingAdress.country}
       onChange={(e) =>
        setShippingAdress({ ...shippingAdress, country: e.target.value })
       }
       className="w-full p-2 border border-gray-300 rounded"
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">Phone Number</label>
      <input
       type="tel"
       value={shippingAdress.phone}
       onChange={(e) =>
        setShippingAdress({ ...shippingAdress, phone: e.target.value })
       }
       className="w-full p-2 border border-gray-300 rounded"
       required
      />
     </div>
     <div className="mt-6">
      {!checkoutId ? (
       <button className="w-full bg-black text-white py-3 rounded">
        Continue to Payment
       </button>
      ) : (
       <div>
        <h3 className="text-lg mb-4">Pay with Paypal</h3>
        <PayPalBtn
         amount={cart.totalPrice}
         onSuccess={handlePaymentSuccess}
         onError={(err) => alert("Payment failed, try again." + err)}
        />
       </div>
      )}
     </div>
    </form>
   </div>
   {/* Right Section */}
   <div className="bg-gray-50 p-6 rounded-lg">
    <h3 className="text-lg mb-4">Order Summary</h3>
    <div className="border-t py-4 mb-4 border-gray-200">
     {cart?.products?.map((product, i) => (
      <div
       key={i}
       className="flex items-start justify-between py-2 border-b border-gray-200"
      >
       <div className="flex items-start">
        <img
         src={product.image}
         alt={product.name}
         className="w-20 h-24 object-cover mr-4"
        />
        <div>
         <h3 className="text-md">{product.name}</h3>
         <p className="text-sm text-gray-500">Size: {product.size}</p>
         <p className="text-sm text-gray-500">Color: {product.color}</p>
        </div>
       </div>
       <p className="text-xl">${product.price?.toLocaleString()}</p>
      </div>
     ))}
    </div>
    <div className="flex justify-between items-center text-lg mb-4">
     <p>Subtotal</p>
     <p>${cart.totalPrice?.toLocaleString()}</p>
    </div>
    <div className="flex justify-between items-center text-lg">
     <p>Shipping</p>
     <p>Free</p>
    </div>
    <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
     <p>Total</p>
     <p>${cart.totalPrice?.toLocaleString()}</p>
    </div>
   </div>
  </div>
 );
};

const cart = {
 products: [
  {
   name: "Stylish Jacket",
   size: "L",
   color: "Black",
   price: 120,
   image: "https://picsum.photos/150?random=1",
  },
  {
   name: "Sneakers",
   size: "42",
   color: "White",
   price: 75,
   image: "https://picsum.photos/150?random=2",
  },
 ],
 totalPrice: 195,
};

export default Checkout;
