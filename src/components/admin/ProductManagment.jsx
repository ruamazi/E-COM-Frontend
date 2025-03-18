import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../redux/slices/adminSlice";
import Loader from "../common/Loader";

const ProductManagment = () => {
 const { user } = useSelector((state) => state.auth);
 const { products, productsLoading, productsError } = useSelector(
  (state) => state.admin
 );

 const dispatch = useDispatch();
 const navigate = useNavigate();

 const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
   dispatch(deleteProduct(id));
  }
 };

 useEffect(() => {
  if (!user || user.role !== "admin") return navigate("/");
  dispatch(getAllProducts());
 }, [dispatch, user, navigate]);

 if (productsLoading) return <Loader />;
 if (productsError)
  return (
   <p className="text-red-600 text-center py-10">Error: {productsError}</p>
  );

 return (
  <div className="max-w-7xl mx-auto p-6">
   <h2 className="text-2xl font-bold mb-6">Product Managment</h2>
   <div className="overflow-hidden shadow-sm sm:rounded-lg">
    <table className="min-w-full text-left text-gray-500">
     <thead className="text-xs text-gray-700 uppercase bg-gray-100">
      <tr>
       <th className="py-3 px-4">Name</th>
       <th className="py-3 px-4">Price</th>
       <th className="py-3 px-4">SKU</th>
       <th className="py-3 px-4">Image</th>
       <th className="py-3 px-4">Actions</th>
      </tr>
     </thead>
     <tbody>
      {products.length > 0 ? (
       products.map((product) => (
        <tr
         key={product._id}
         className="border-b cursor-pointer hover:bg-gray-50"
        >
         <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
          {product.name}
         </td>
         <td className="p-4">{product.price.toFixed(2)}</td>
         <td className="p-4">{product.sku}</td>
         <td className="p-4">
          <img
           src={product.images[0].url}
           alt={product.images[0].altText || product.name}
           className="w-10 h-10 rounded-lg"
          />
         </td>
         <td className="p-4 text-sm flex gap-1 items-center">
          <Link
           to={`/admin/products/edit/${product._id}`}
           className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
           Edit
          </Link>
          <button
           onClick={() => handleDelete(product._id)}
           className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
           Delete
          </button>
         </td>
        </tr>
       ))
      ) : (
       <tr>
        <td colSpan={4} className="p-4 text-center text-gray-500">
         No products found
        </td>
       </tr>
      )}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default ProductManagment;
