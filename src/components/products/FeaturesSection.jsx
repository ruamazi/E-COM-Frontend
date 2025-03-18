import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeaturesSection = () => {
 const total_for_free_shipping = 100;
 const return_day_policy = 45;

 const features_info = [
  {
   id: "1",
   title: `${return_day_policy} DAYS RETURN`,
   more: "Money back guarantee",
   icon: <HiArrowPathRoundedSquare className="text-xl" />,
  },
  {
   id: "2",
   title: `FREE INTERNATIONAL SHIPPING`,
   more: `On all orders over ${total_for_free_shipping}`,
   icon: <HiShoppingBag className="text-xl" />,
  },
  {
   id: "3",
   title: "SECURE CHECKOUT",
   more: "100% secured checkout process",
   icon: <HiOutlineCreditCard className="text-xl" />,
  },
 ];

 return (
  <section className="py-16 px-4 bg-white">
   <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    {features_info.map((feature) => (
     <div key={feature.id} className="flex flex-col items-center">
      <div className="p-4 rounded-full mb-4">{feature.icon}</div>
      <h4 className="tracking-tighter mb-2">{feature.title}</h4>
      <p className="text-gray-600 text-sm tracking-tighter">{feature.more}</p>
     </div>
    ))}
   </div>
  </section>
 );
};

export default FeaturesSection;
