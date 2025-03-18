import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currency } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../redux/slices/orderSlice";
import Loader from "../components/common/Loader";

const MyOrders = () => {
 const { orders, loading, error } = useSelector((state) => state.order);
 const dispatch = useDispatch();

 const navigate = useNavigate();

 const handleRowClick = (id) => {
  navigate(`/order/${id}`);
 };

 useEffect(() => {
  dispatch(getMyOrders());
 }, [dispatch]);

 if (loading) return <Loader />;
 if (error) return <p className="text-center py-10">Error: {error}</p>;
 if (!orders || orders.length === 0)
  return <p className="text-center py-10">No orders</p>;

 return (
  <div className="max-w-7xl mx-auto p-4 sm:p-6">
   <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
   <div className=" relative shadow-md sm:rounded-lg overflow-hidden">
    <table className="min-w-full text-left text-gray-500">
     <thead className="bg-gray-100 text-xs uppercase text-gray-700">
      <tr>
       <th className="py-2 px-4 sm:py-3">Image</th>
       <th className="py-2 px-4 sm:py-3">Order ID</th>
       <th className="py-2 px-4 sm:py-3">Created</th>
       <th className="py-2 px-4 sm:py-3">Shipping Adress</th>
       <th className="py-2 px-4 sm:py-3">Items</th>
       <th className="py-2 px-4 sm:py-3">Price</th>
       <th className="py-2 px-4 sm:py-3">Status</th>
      </tr>
     </thead>
     <tbody>
      {orders.length > 0 ? (
       orders.map((order) => (
        <tr
         key={order._id}
         className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
         onClick={() => handleRowClick(order._id)}
        >
         <td className="py-2 px-2 sm:py-4">
          <img
           src={order.orderItems[0].image}
           alt={order.orderItems[0].name}
           className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
          />
         </td>
         <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
          #{order._id}
         </td>
         <td className="py-2 px-2 sm:py-4 sm:px-4">
          {new Date(order.createdAt).toLocaleDateString()}
          {new Date(order.createdAt).toLocaleTimeString()}
         </td>
         <td className="py-2 px-2 sm:py-4 sm:px-4">
          {order.shippingAdress
           ? `${order.shippingAdress.city}, ${order.shippingAdress.country}`
           : "N/A"}
         </td>
         <td className="py-2 px-2 sm:py-4 sm:px-4">
          {order.orderItems.length}
         </td>
         <td className="py-2 px-2 sm:py-4 sm:px-4">
          {currency}
          {order.totalPrice}
         </td>
         <td className="py-2 px-2 sm:py-4 sm:px-4">
          <span
           className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
            order.isPaid
             ? "bg-green-100 text-green-700"
             : "bg-red-100 text-red-700"
           }`}
          >
           {order.isPaid ? "Paid" : "Pending"}
          </span>
         </td>
        </tr>
       ))
      ) : (
       <tr>
        <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
         No orders
        </td>
       </tr>
      )}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default MyOrders;
