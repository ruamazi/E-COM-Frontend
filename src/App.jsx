import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import UserLayout from "./components/layout/UserLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Collection from "./pages/Collection";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails";
import MyOrders from "./pages/MyOrders";
import AdminLayout from "./components/admin/AdminLayout";
import UserManagment from "./components/admin/UserManagment";
import ProductManagment from "./components/admin/ProductManagment";
import EditProduct from "./components/admin/EditProduct";
import OrderManagment from "./components/admin/OrderManagment";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
 const routesWithUserLayout = [
  {
   path: "/",
   isIndex: true,
   element: <Home />,
  },
  {
   path: "login",
   isIndex: false,
   element: <Login />,
  },
  {
   path: "register",
   isIndex: false,
   element: <Register />,
  },
  {
   path: "profile",
   isIndex: false,
   element: <Profile />,
  },
  {
   path: "collections/:collection",
   isIndex: false,
   element: <Collection />,
  },
  {
   path: "product/:id",
   isIndex: false,
   element: <ProductDetails />,
  },
  {
   path: "checkout",
   isIndex: false,
   element: <Checkout />,
  },
  {
   path: "order-confirmation",
   isIndex: false,
   element: <OrderConfirmation />,
  },
  {
   path: "order/:id",
   isIndex: false,
   element: <OrderDetails />,
  },
  {
   path: "my-orders",
   isIndex: false,
   element: <MyOrders />,
  },
 ];

 return (
  <Routes>
   <Route path="/" element={<UserLayout />}>
    {routesWithUserLayout.map((r) => (
     <Route key={r.path} index={r.isIndex} path={r.path} element={r.element} />
    ))}
   </Route>
   <Route
    path="/admin"
    element={
     <ProtectedRoute role="admin">
      <AdminLayout />
     </ProtectedRoute>
    }
   >
    <Route index element={<Admin />} />
    <Route path="users" element={<UserManagment />} />
    <Route path="products" element={<ProductManagment />} />
    <Route path="products/edit/:id" element={<EditProduct />} />
    <Route path="orders" element={<OrderManagment />} />
   </Route>
  </Routes>
 );
};

export default App;
