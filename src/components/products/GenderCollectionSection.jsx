import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
 const sections_info = [
  {
   name: "Women's Collection",
   to: "gender=women",
   img: lady_fashion_img,
  },
  {
   name: "Men's Collection",
   to: "gender=men",
   img: men_fashion_img,
  },
 ];

 return (
  <section className="py-16 px-4 lg:px-0">
   <div className="container mx-auto flex flex-col md:flex-row gap-8">
    {sections_info.map((sec, i) => (
     <div className=" relative flex-1" key={i}>
      <img
       src={sec.img}
       alt={sec.name}
       className="w-full h-[700px] object-cover"
      />
      <div className=" absolute bottom-8 left-8 bg-white/90 p-4">
       <h2 className="text-2xl font-bold text-gray-900 mb-3">{sec.name}</h2>
       <Link
        to={`/collections/all?${sec.to}`}
        className=" text-gray-900 underline"
       >
        Shop Now
       </Link>
      </div>
     </div>
    ))}
   </div>
  </section>
 );
};

const men_fashion_img =
 "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D";

const lady_fashion_img =
 "https://plus.unsplash.com/premium_photo-1673758905770-a62f4309c43c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWx8ZW58MHx8MHx8fDA%3D";
export default GenderCollectionSection;
