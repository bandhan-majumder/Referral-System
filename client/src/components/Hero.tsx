import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="text-center mx-auto py-6 tracking-wide">
        <h1 className="text-slate-200/80 md:text-7xl px-4 text-nowrap font-serif">
          REFER YOUR FRIEND,
        </h1>
        <h1 className="text-green-800 md:text-6xl px-4 py-2 text-nowrap font-serif">
          REFER THE FUTURE
        </h1>
      </div>
      <div className="max-w-7xl mx-auto py-10 flex justify-between items-center">
        <img
          src="https://i.ibb.co/6NkfcvX/Animated-Female-Characters-Under-Stylized-Sun-1.jpg"
          alt="Animated-Female-Characters-Under-Stylized-Sun-1"
          className="rounded-3xl md:max-h-[50vh] shadow-2xl"
        />
        <div className="md:max-w-[40vw] lg:max-w[30vw]">
          <h1 className="text-5xl font-extrabold px-4 font-serif">Welcome!</h1>
          <p className="py-7 px-4">
            Join our growing community where connections create opportunities.
            When you refer a friend, you're not just sharing a platform - you're
            shaping the future of networking. Every referral builds our
            ecosystem stronger, rewards both you and your friend, and helps us
            create a more connected world. Together, we grow better.
          </p>
          <div className="flex flex-row">
            <Link to="/signup">
              <button className="transition-all duration-300 rounded-lg text-lg bg-green-500 font-medium py-2 tracking-tighter px-4 mx-4 hover:bg-green-600 outline">
                SIGN UP NOW
              </button>
            </Link>
            <Link to="/signin">
              <button className="transition-all duration-300 rounded-lg text-lg bg-yellow-10 font-medium py-2 tracking-tighter px-3 mx-4 hover:bg-slate-300 outline">
                SIGN IN
              </button>
            </Link>
            <Link to="/signup" className="py-1 hover:text-slate-300 cursor-pointer">
            <HiOutlineArrowNarrowRight className="text-4xl"/>
            </Link>
            
          </div>
        </div>
        <div></div>
      </div>
      <p className="text-center">
        Know more about us{" "}
        <span className="text-green-900 underline">here</span>
      </p>
    </>
  );
}

export default Hero;
