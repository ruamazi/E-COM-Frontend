import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import {
 createNewUser,
 deleteUser,
 getAllUsers,
 updateUser,
} from "../../redux/slices/adminSlice";

const UserManagment = () => {
 const defaultFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
 };
 const [formData, setFormData] = useState(defaultFormData);
 const { user } = useSelector((state) => state.auth);
 const { users, usersLoading, usersError } = useSelector(
  (state) => state.admin
 );
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(createNewUser(formData));
  setFormData(defaultFormData);
 };

 const handleRoleChange = (userId, newRole) => {
  dispatch(
   updateUser({
    id: userId,
    role: newRole,
   })
  );
 };

 const handleDeleteUser = (userId) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
   dispatch(deleteUser(userId));
  }
 };

 useEffect(() => {
  if (user && user.role !== "admin") {
   return navigate("/");
  }
  dispatch(getAllUsers());
 }, [dispatch, user, navigate]);

 if (usersLoading) return <Loader />;
 if (usersError)
  return <p className="text-center py-10">Error: {usersError}</p>;

 return (
  <div className="max-w-8xl mx-auto p-6">
   <h2 className="text-2xl font-bold mb-6">User Managment</h2>
   {/* Add new User Form */}
   <div className="p-6 rounded-lg mb-6 bg-slate-200 flex items-center flex-col ">
    <h3 className="text-lg font-bold mb-4 ">Add New User</h3>
    <form onSubmit={handleSubmit} className="  w-full max-w-[26rem]">
     <div className="mb-4 ">
      <label className="block text-gray-700 ">Name</label>
      <input
       type="text"
       name="name"
       value={formData.name}
       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
       className="w-full p-2 rounded bg-white"
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">Email</label>
      <input
       type="email"
       name="email"
       value={formData.email}
       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
       className="w-full p-2 rounded bg-white"
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">Password</label>
      <input
       type="password"
       name="password"
       value={formData.password}
       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
       className="w-full p-2 rounded bg-white"
       required
      />
     </div>
     <div className="mb-4">
      <label className="block text-gray-700">Role</label>
      <select
       name="role"
       value={formData.role}
       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
       className="w-full p-2 rounded bg-white"
       required
      >
       <option value="customer">Customer</option>
       <option value="admin">Admin</option>
      </select>
     </div>
     <button
      type="submit"
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
     >
      Add User
     </button>
    </form>
   </div>
   {/* User List Managment */}
   <div className="overflow-x-auto shadow-md sm:rounded-lg">
    <table className="min-w-full divide-y divide-gray-200 text-left text-gray-500">
     <thead className="bg-gray-50 text-xs uppercase text-gray-700">
      <tr>
       <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
        Name
       </th>
       <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
        Email
       </th>
       <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
        Role
       </th>
       <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
        Actions
       </th>
      </tr>
     </thead>
     <tbody className="divide-y divide-gray-200">
      {users?.map((user, i) => (
       <tr key={i} className="text-sm">
        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">
         <select
          value={user.role}
          onChange={(e) => handleRoleChange(user._id, e.target.value)}
         >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
         </select>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
         <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={() => handleDeleteUser(user._id)}
         >
          Delete
         </button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default UserManagment;
