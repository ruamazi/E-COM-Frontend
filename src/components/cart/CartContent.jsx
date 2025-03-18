import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
 removeFromCart,
 updateProductQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
 const dispatch = useDispatch();

 const handleAddToCart = (productId, delta, quantity, size, color) => {
  const newQuantity = quantity + delta;
  if (newQuantity >= 1) {
   dispatch(
    updateProductQuantity({
     productId,
     quantity: newQuantity,
     guestId,
     userId,
     size,
     color,
    })
   );
  }
 };

 const handleRemoveFromCart = (productId, size, color) => {
  dispatch(
   removeFromCart({
    productId,
    size,
    color,
    userId,
    guestId,
   })
  );
 };

 return (
  <div>
   {cart.products.map((product, i) => (
    <div
     key={i}
     className="flex items-start justify-between p-4 border-b border-gray-200"
    >
     <div className="flex items-start">
      <img
       src={product.image}
       alt={product.name}
       className="w-20 h-24 object-cover mr-4 rounded"
      />
      <div>
       <h3>{product.name}</h3>
       <p className="text-sm text-gray-500">
        Size: {product.size} | Color: {product.color}
       </p>
       <div className="flex items-center mt-2">
        <button
         onClick={() =>
          handleAddToCart(
           product.productId,
           -1,
           product.quantity,
           product.size,
           product.color
          )
         }
         className="border rounded px-2 py-1 text-xl font-medium"
        >
         -
        </button>
        <span className="mx-4">{product.quantity}</span>
        <button
         onClick={() =>
          handleAddToCart(
           product.productId,
           1,
           product.quantity,
           product.size,
           product.color
          )
         }
         className="border rounded px-2 py-1 text-xl font-medium"
        >
         +
        </button>
       </div>
      </div>
     </div>
     <div className="flex items-center flex-col">
      <p className="font-medium">$ {product.price.toLocaleString()}</p>
      <button
       onClick={() =>
        handleRemoveFromCart(product.productId, product.size, product.color)
       }
       className="text-red-400 hover:bg-red-500 px-1 py-1 rounded-full hover:text-white mt-2"
      >
       <RiDeleteBin3Line className=" " size={20} />
      </button>
     </div>
    </div>
   ))}
  </div>
 );
};

export default CartContent;
