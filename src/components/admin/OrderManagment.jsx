import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
 deleteOrder,
 getAllOrders,
 updateOrderStatus,
} from "../../redux/slices/adminSlice";
import Loader from "../common/Loader";

const OrderManagment = () => {
 const { user } = useSelector((state) => state.auth);
 const { orders, ordersLoading, ordersError } = useSelector(
  (state) => state.admin
 );
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const handleStatusChange = (orderId, status) => {
  dispatch(updateOrderStatus({ id: orderId, status }));
 };
 const handleDeleteOrder = (orderId) => {
  if (window.confirm("Are you sure you want to delete this order?")) {
   dispatch(deleteOrder(orderId));
  }
 };

 useEffect(() => {
  if (!user || user.role !== "admin") return navigate("/");
  dispatch(getAllOrders());
 }, [dispatch, user, navigate]);

 if (ordersLoading) return <Loader />;
 if (ordersError)
  return <p className="text-red-600 text-center py-10">Error: {ordersError}</p>;

 return (
  <div className="max-w-7xl mx-auto p-6">
   <h2 className="text-2xl font-bold mb-6">Order Managment</h2>
   <table className="min-w-full text-left text-gray-500">
    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
     <tr>
      <th className="py-3 px-4">Order ID</th>
      <th className="py-3 px-4">Customer Name</th>
      <th className="py-3 px-4">Customer Email</th>
      <th className="py-3 px-4">Order Date</th>
      <th className="py-3 px-4">Total Price</th>
      <th className="py-3 px-4">Status</th>
      <th className="py-3 px-4">Actions</th>
     </tr>
    </thead>
    <tbody>
     {orders.length > 0 ? (
      orders.map((order) => (
       <tr
        key={order._id}
        className="border-b border-gray-50 cursor-pointer text-sm md:text-base"
       >
        <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
         {order._id}
        </td>
        <td className="p-3">{order.user.name}</td>
        <td className="p-3">{order.user.email}</td>
        <td className="p-3">{order.date}</td>
        <td className="p-3">{order.totalPrice.toFixed(2)}</td>
        <td className="p-3">
         <select
          className="border border-gray-50 rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500 block"
          value={order.status}
          onChange={(e) => {
           handleStatusChange(order._id, e.target.value);
          }}
         >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
         </select>
        </td>
        <td className="p-3">
         {order.status === "Cancelled" || order.status === "Delivered" ? (
          <button
           onClick={() => handleDeleteOrder(order._id)}
           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
          >
           Delete
          </button>
         ) : (
          <button
           onClick={() => handleStatusChange(order._id, "Delivered")}
           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
           Mark as Delivered
          </button>
         )}
        </td>
       </tr>
      ))
     ) : (
      <tr>
       <td colSpan={7} className="p-4 text-center text-gray-500">
        No orders found
       </td>
      </tr>
     )}
    </tbody>
   </table>
   <p className="text-sm text-gray-500 mt-4">
    You can DELETE only orders that are Delivered or Cancelled and older than 3
    months.
   </p>
  </div>
 );
};

export default OrderManagment;
