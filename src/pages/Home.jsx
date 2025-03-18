import { useEffect, useState } from "react";
import Hero from "../components/layout/Hero";
import FeaturedCollection from "../components/products/FeaturedCollection";
import FeaturesSection from "../components/products/FeaturesSection";
import GenderCollectionSection from "../components/products/GenderCollectionSection";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetails from "../components/products/ProductDetails";
import ProductGrid from "../components/products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../redux/slices/productsSlice";
import axios from "axios";
import { API_URL } from "../constants";

const Home = () => {
 const [bestSeller, setBestSeller] = useState(null);
 const dispatch = useDispatch();
 const { products, loading, error } = useSelector((state) => state.products);

 const fetchBestSeller = async () => {
  try {
   const response = await axios.get(`${API_URL}/api/products/best-seller`);
   setBestSeller(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  dispatch(
   fetchProductsByFilter({
    gender: "Women",
    category: "Bottom Wear",
    limit: 8,
   })
  );
  fetchBestSeller();
 }, [dispatch]);

 return (
  <>
   <Hero />
   <GenderCollectionSection />
   <NewArrivals />
   <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
   {bestSeller ? (
    <ProductDetails productId={bestSeller._id} />
   ) : (
    <div className="container mx-auto">
     <p className="text-center">Loading Best Seller products...</p>
    </div>
   )}
   <div className="container mx-auto">
    <h2 className="text-3xl text-center font-bold mb-4">Top Wears for Women</h2>
    <ProductGrid products={products} loading={loading} error={error} />
   </div>
   <FeaturedCollection />
   <FeaturesSection />
  </>
 );
};

export default Home;
