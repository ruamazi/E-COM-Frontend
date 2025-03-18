import { useEffect, useState } from "react";
import { LOGO_NAME } from "../components/common/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeGuestCartIntoUserCart } from "../redux/slices/cartSlice";

const login_img =
 "https://plus.unsplash.com/premium_photo-1695575576052-7c271876b075?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kYXxlbnwwfHwwfHx8MA%3D%3D";

const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const location = useLocation();
 const { user, guestId, loading } = useSelector((state) => state.auth);
 const { cart } = useSelector((state) => state.cart);

 const redirect = new URLSearchParams(location.search).get("redirect") || "/";
 const isCheckoutRedirect = redirect.includes("checkout");

 const handleLogin = (e) => {
  e.preventDefault();
  dispatch(loginUser({ email, password, guestId, cart, redirect }));
 };

 useEffect(() => {
  if (user) {
   if (cart?.products?.length > 0 && guestId) {
    dispatch(mergeGuestCartIntoUserCart({ guestId, user })).then(() => {
     navigate(isCheckoutRedirect ? "/checkout" : "/");
    });
   } else {
    navigate(isCheckoutRedirect ? "/checkout" : "/");
   }
  }
 }, [user, navigate, cart, guestId, dispatch, isCheckoutRedirect]);

 return (
  <div className="flex">
   <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
    <form
     onSubmit={handleLogin}
     className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
    >
     <div className="flex justify-center mb-6">
      <h2 className="text-xl font-medium">{LOGO_NAME}</h2>
     </div>
     <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
     <p className="text-center mb-6">
      Enter your Username and Password to Login
     </p>
     <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">Email</label>
      <input
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="w-full p-2 border rounded"
       placeholder="Enter your email address"
      />
     </div>
     <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">Password</label>
      <input
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="w-full p-2 border rounded"
       placeholder="Enter your password"
      />
     </div>
     <button
      disabled={loading}
      className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg:gray-800 transition disabled:opacity-50"
     >
      {loading ? "Logging in..." : "Login"}
     </button>
     <p className="mt-6 text-center text-sm">
      Dont´t have an account?{" "}
      <Link
       className="text-blue-500"
       to={`/register?redirect=${encodeURIComponent(redirect)}`}
      >
       Register
      </Link>
     </p>
    </form>
   </div>
   <div className="hidden md:block w-1/2 bg-gray-800">
    <div className="h-full flex flex-col justify-center items-center">
     <img
      src={login_img}
      alt="login to account"
      className="h-[750px] w-full object-cover"
     />
    </div>
   </div>
  </div>
 );
};

export default Login;
