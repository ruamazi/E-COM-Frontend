import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/slices/productsSlice";
import { API_URL, sendTokenHeader } from "../../constants";
import Loader from "../common/Loader";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminSlice";

const EditProduct = () => {
 const [productData, setProductData] = useState({
  name: "",
  description: "",
  price: 0,
  countInStock: 0,
  sku: "",
  category: "",
  brand: "",
  sizes: [],
  colors: [],
  collections: "",
  material: "",
  gender: "",
  images: [],
 });
 const [uploading, setUploading] = useState(false);
 const { selectedProduct, loading, error } = useSelector(
  (state) => state.products
 );
 const { id } = useParams();
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("image", file);
  try {
   setUploading(true);
   const resp = await axios.post(
    `${API_URL}/api/image/upload-image`,
    formData,
    {
     headers: {
      "Content-Type": "multipart/form-data",
      ...sendTokenHeader.headers,
     },
    }
   );
   setProductData((prevData) => ({
    ...prevData,
    images: [...prevData.images, { url: resp.data.imageUrl, altText: "" }],
   }));
  } catch (error) {
   console.log(error);
  } finally {
   setUploading(false);
  }
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(updateProduct({ id, productData }));
  navigate("/admin/products");
 };

 useEffect(() => {
  dispatch(fetchProductById(id));
 }, [dispatch, id]);

 useEffect(() => {
  if (selectedProduct) {
   setProductData(selectedProduct);
  }
 }, [selectedProduct]);

 if (loading) return <Loader />;
 if (error)
  return <p className="text-center py-10 text-red-600">Error: {error}</p>;

 return (
  <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
   <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
   <form onSubmit={handleSubmit}>
    {/* Name */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Product Name</label>
     <input
      type="text"
      name="name"
      value={productData.name}
      required
      onChange={(e) => setProductData({ ...productData, name: e.target.value })}
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Description */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Description</label>
     <textarea
      name="description"
      value={productData.description}
      required
      rows={4}
      onChange={(e) =>
       setProductData({ ...productData, description: e.target.value })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Price */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Price</label>
     <input
      type="number"
      name="price"
      value={productData.price}
      required
      onChange={(e) =>
       setProductData({ ...productData, price: e.target.value })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Count In Stock */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Count In Stock</label>
     <input
      type="number"
      name="countInStock"
      value={productData.countInStock}
      required
      onChange={(e) =>
       setProductData({ ...productData, countInStock: e.target.value })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* SKU */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">SKU</label>
     <input
      type="text"
      name="sku"
      value={productData.sku}
      required
      onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Sizes */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Sizes</label>
     <input
      type="text"
      name="sizes"
      value={productData.sizes.join(", ")}
      onChange={(e) =>
       setProductData({
        ...productData,
        sizes: e.target.value.split(",").map((size) => size.trim()),
       })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Colors */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Colors</label>
     <input
      type="text"
      name="colors"
      value={productData.colors.join(", ")}
      onChange={(e) =>
       setProductData({
        ...productData,
        colors: e.target.value.split(",").map((color) => color.trim()),
       })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Image Upload */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Upload Image</label>
     <input
      type="file"
      name="images"
      multiple
      onChange={handleImageUpload}
      className="w-full border border-gray-300 rounded-md p-2"
     />
     <div className="flex gap-4 mt-4">
      {productData.images.length > 0 &&
       productData.images.map((image, index) => (
        <img
         key={index}
         src={image.url}
         alt={`Product ${index}`}
         className="w-32 h-32 object-cover rounded-md shadow-md"
        />
       ))}
     </div>
    </div>
    <button
     disabled={uploading}
     type="submit"
     className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 "
    >
     {uploading ? "Uploading an image..." : "Save Changes"}
    </button>
   </form>
  </div>
 );
};

export default EditProduct;
