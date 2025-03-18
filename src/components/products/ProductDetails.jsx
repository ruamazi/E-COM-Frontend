import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
 fetchProductById,
 fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import Loader from "../common/Loader";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
 const [selectedSize, setSelectedSize] = useState("");
 const [selectedColor, setSelectedColor] = useState("");
 const [quantity, setQuantity] = useState(1);
 const [disableAddToCartBtn, setDisableAddToCartBtn] = useState(false);
 const { selectedProduct, loading, error, similarProducts } = useSelector(
  (state) => state.products
 );
 const [mainImg, setMainImg] = useState(selectedProduct?.images[0]?.url);
 const { user, guestId } = useSelector((state) => state.auth);
 const { id } = useParams();
 const dispatch = useDispatch();

 const handleQuantity = (action) => {
  if (action === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  if (action === "inc") setQuantity((prev) => prev + 1);
 };

 const productFetchId = productId || id;

 const handleAddToCart = () => {
  toast.dismiss();
  if (!selectedSize || !selectedColor) {
   toast.error("Select size and color before adding to cart.");
   return;
  }
  setDisableAddToCartBtn(true);
  dispatch(
   addToCart({
    productId: productFetchId,
    size: selectedSize,
    color: selectedColor,
    quantity,
    guestId,
    userId: user?._id,
   })
  )
   .then(() => {
    toast.success("Product added to cart.", {
     autoClose: 1000,
    });
   })
   .finally(() => setDisableAddToCartBtn(false));
 };

 useEffect(() => {
  if (selectedProduct?.images?.length > 0) {
   setMainImg(selectedProduct.images[0].url);
  }
 }, [selectedProduct]);

 useEffect(() => {
  if (productFetchId) {
   dispatch(fetchProductById(productFetchId));
   dispatch(fetchSimilarProducts(productFetchId));
  }
 }, [dispatch, productFetchId]);

 if (loading) {
  return <Loader />;
 }
 if (error) {
  return <p className="text-red-500 text-center">{error}</p>;
 }

 return (
  <div className="p-6">
   <div className="max-w-6xl mx-auto bg-white rounded-lg">
    <div className="flex flex-col md:flex-row">
     {/* Left Thamnnail */}
     <div className="hidden md:flex flex-col space-y-4 mr-6">
      {selectedProduct?.images?.map((image, i) => (
       <img
        onClick={() => setMainImg(image?.url)}
        key={i}
        src={image?.url}
        alt={image?.altText || `Thumbnail ${i}`}
        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
            ${
             mainImg === image?.url
              ? "border-2 border-black"
              : "border-r-gray-300"
            }`}
       />
      ))}
     </div>
     {/* Main Img */}
     <div className="md:w-1/2">
      <div className="mb-4">
       <img
        src={mainImg}
        alt="Main Product"
        className="w-full h-auto object-cover rounded-lg"
        onClick={() => setMainImg(image?.url)}
       />
      </div>
     </div>
     {/* Mobile */}
     <div className="md:hidden flex overscroll-y-scroll space-x-4 mb-4">
      {selectedProduct?.images?.map((image, i) => (
       <img
        key={i}
        src={image?.url}
        alt={image?.altText || `Thumbnail ${i}`}
        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border
            ${
             mainImg === image.url
              ? "border-2 border-yellow-500"
              : "border-r-gray-300"
            }`}
        onClick={() => setMainImg(image.url)}
       />
      ))}
     </div>
     {/* Right Side*/}
     <div className="md:w-1/2 md:ml-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">
       {selectedProduct?.name}
      </h1>
      <p className="text-lg text-gray-600 mb-1 line-through">
       {selectedProduct?.originalPrice && `${selectedProduct.originalPrice}`}
      </p>
      <p className="text-xl text-gray-500 mb-2">$ {selectedProduct?.price}</p>
      <p className="text-gray-600 mb-4">{selectedProduct?.description}</p>
      <div className="mb-4">
       <p className="text-gray-700">Color:</p>
       <div className="flex gap-2 mt-2">
        {selectedProduct?.colors.map((color, i) => (
         <button
          key={i}
          onClick={() => setSelectedColor(color)}
          className={`w-8 h-8 rounded-full border ${
           selectedColor === color
            ? "border-3 border-yellow-500"
            : "border-gray-300"
          }`}
          style={{
           backgroundColor: color.toLocaleLowerCase(),
          }}
         ></button>
        ))}
       </div>
      </div>
      <div className="mb-4">
       <p className="text-gray-700">Size:</p>
       <div className="flex gap-2 mt-2">
        {selectedProduct?.sizes.map((size, i) => (
         <button
          key={i}
          className={`px-4 py-2 rounded border ${
           selectedSize === size ? "bg-black text-white" : ""
          }`}
          onClick={() => setSelectedSize(size)}
         >
          {size}
         </button>
        ))}
       </div>
      </div>
      <div className="mb-6">
       <p className="text-gray-700">Quantity:</p>
       <div className="flex items-center space-x-4 mt-2">
        <button
         onClick={() => handleQuantity("dec")}
         className="px-2 py-1 bg-gray-200 rounded text-lg"
        >
         -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
         onClick={() => handleQuantity("inc")}
         className="px-2 py-1 bg-gray-200 rounded text-lg"
        >
         +
        </button>
       </div>
      </div>
      <button
       onClick={handleAddToCart}
       disabled={disableAddToCartBtn}
       className={`bg-black text-white py-2 px-6 rounded w-full mb-4
        ${
         disableAddToCartBtn
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-900"
        }`}
      >
       {disableAddToCartBtn ? "Adding ..." : "Add To Cart"}
      </button>
      <div className="mt-10 text-gray-700">
       <h3 className="text-xl font-bold mb-4">Characteristics</h3>
       <table className="w-full text-left text-sm text-gray-600">
        <tbody>
         <tr>
          <td className="py-1">Brand</td>
          <td className="py-1">{selectedProduct?.brand}</td>
         </tr>
         <tr>
          <td className="py-1">Material</td>
          <td className="py-1">{selectedProduct?.material}</td>
         </tr>
        </tbody>
       </table>
      </div>
     </div>
    </div>
    <div className="mt-20">
     <h2 className="text-2xl text-center font-medium mb-2">
      You May Also Like
     </h2>
     <ProductGrid products={similarProducts} loading={loading} error={error} />
    </div>
   </div>
  </div>
 );
};

export default ProductDetails;
