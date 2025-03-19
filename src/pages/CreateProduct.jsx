import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, sendTokenHeader } from "../constants";
import { createProduct } from "../redux/slices/adminSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
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
  collections: [],
  material: "",
  gender: "Unisex",
  images: [],
  discountPrice: 0,
  isFeatured: false,
  isPublished: false,
  dimensions: {
   length: 0,
   width: 0,
   height: 0,
  },
  weight: 0,
 });
 const [uploading, setUploading] = useState(false);
 const [imageDescription, setImageDescription] = useState("");

 const navigate = useNavigate();
 const dispatch = useDispatch();

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
    images: [
     ...prevData.images,
     {
      url: resp.data.imageUrl,
      altText: imageDescription.trim() || "No description",
     },
    ],
   }));
   setImageDescription("");
  } catch (error) {
   console.log(error);
  } finally {
   setUploading(false);
  }
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log(productData);
  dispatch(createProduct(productData));
  navigate("/admin/products");
 };

 return (
  <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
   <h2 className="text-3xl font-bold mb-6">Create New Product</h2>
   <form onSubmit={handleSubmit}>
    {/* Name */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">
      Product Name <span className="text-red-500">*</span>
     </label>
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
     <label className="block font-semibold mb-2">
      Description <span className="text-red-500">*</span>
     </label>
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
    {/* Gender */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Gender</label>
     <select
      name="gender"
      value={productData.gender}
      onChange={(e) =>
       setProductData({ ...productData, gender: e.target.value })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     >
      <option value="Men">Men</option>
      <option value="Women">Women</option>
      <option value="Unisex">Unisex</option>
     </select>
    </div>
    {/* Price */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">
      Price <span className="text-red-500">*</span>
     </label>
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
     <label className="block font-semibold mb-2">
      SKU <span className="text-red-500">*</span>
     </label>
     <input
      type="text"
      name="sku"
      required
      value={productData.sku}
      onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Sizes */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">
      Sizes <span className="text-red-500">*</span>
     </label>
     <input
      type="text"
      name="sizes"
      required
      value={productData.sizes.join(", ")}
      onChange={(e) =>
       setProductData({
        ...productData,
        sizes: e.target.value
         .split(",")
         .map((size) => size.trim())
         .filter((size) => size),
       })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Colors */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">
      Colors <span className="text-red-500">*</span>
     </label>
     <input
      type="text"
      name="colors"
      required
      value={productData.colors.join(", ")}
      onChange={(e) =>
       setProductData({
        ...productData,
        colors: e.target.value
         .split(",")
         .map((color) => color.trim())
         .filter((color) => color),
       })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Category */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">
      Category <span className="text-red-500">*</span>
     </label>
     <input
      type="text"
      name="category"
      required
      value={productData.category}
      onChange={(e) =>
       setProductData({
        ...productData,
        category: e.target.value,
       })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Collections */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">
      Collections <span className="text-red-500">*</span>
     </label>
     <input
      type="text"
      name="collections"
      required
      value={productData.collections.join(", ")}
      onChange={(e) =>
       setProductData({
        ...productData,
        collections: e.target.value
         .split(",")
         .map((collection) => collection.trim())
         .filter((collection) => collection),
       })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Material */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Material</label>
     <input
      type="text"
      name="material"
      value={productData.material}
      onChange={(e) =>
       setProductData({
        ...productData,
        material: e.target.value,
       })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Brand */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Brand</label>
     <input
      type="text"
      name="brand"
      value={productData.brand}
      required
      onChange={(e) =>
       setProductData({ ...productData, brand: e.target.value })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* weight */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Weight</label>
     <input
      type="text"
      name="weight"
      value={productData.weight}
      required
      onChange={(e) =>
       setProductData({ ...productData, weight: e.target.value })
      }
      className="w-full border border-gray-300 rounded-md p-2"
     />
    </div>
    {/* Image Upload */}
    <div className="py-6">
     <label className="block font-semibold mb-2">
      Upload Image <span className="text-red-500">*</span>
     </label>
     <input
      type="file"
      name="images"
      multiple
      required
      onChange={handleImageUpload}
      className="w-full border border-gray-300 rounded-md p-2"
     />
     <label className="block font-semibold mb-2">Image description</label>
     <input
      type="text"
      onChange={(e) => setImageDescription(e.target.value)}
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
     {uploading ? "Uploading an image..." : "Save Product"}
    </button>
   </form>
   <p className=" mt-4">
    <span className="text-red-500">*</span> - required fields
   </p>
  </div>
 );
};

export default CreateProduct;
