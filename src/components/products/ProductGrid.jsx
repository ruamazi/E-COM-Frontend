import { Link } from "react-router-dom";
import Loader from "../common/Loader";

const ProductGrid = ({ products, loading, error }) => {
 if (loading) {
  return <Loader />;
 }
 if (error) {
  return <p className="text-red-500 text-center">{error}</p>;
 }
 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
   {products.map((product, i) => (
    <Link key={i} to={`/product/${product._id}`} className="block">
     <div className="bg-white p-4 rounded-lg">
      <div className="w-full h-96 mb-4">
       <img
        src={product.images[0].url}
        alt={product.images[0].altText || product.name}
        className="w-full h-full object-cover rounded-lg"
       />
      </div>
      <h3 className="text-sm mb-2">{product.name}</h3>
      <p className="text-gray-500 font-medium text-sm tracking-tighter">
       $ {product.price}
      </p>
     </div>
    </Link>
   ))}
  </div>
 );
};

export default ProductGrid;
