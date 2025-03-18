import { Link } from "react-router-dom";

const Hero = () => {
 return (
  <section className=" relative">
   <img
    src={hero_img}
    alt="E-Com"
    className="w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover"
   />
   <div className=" absolute inset-0 bg-black/10 flex items-center justify-center">
    <div className="text-center text-white/90 p-6">
     <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase mb-4 hero-text">
      vacation
     </h1>
     <p className="text-sm tracking-tight font-light md:text-lg mb-2 bg-black/50 ">
      Explore our vacation-ready outfits with fast worldwide shipping.
     </p>
     <Link
      to={"#"}
      className="bg-black text-white px-6 py-2 rounded-sm text-lg"
     >
      Shop Now
     </Link>
    </div>
   </div>
  </section>
 );
};

const hero_img =
 "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvcHxlbnwwfHwwfHx8MA%3D%3D";

export default Hero;
