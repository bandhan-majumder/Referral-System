import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="max-w-7xl text-center mx-auto py-6 tracking-wide">
        <h1 className="font-black md:text-6xl px-4 text-nowrap font-serif text-4xl flex-nowrap">
          REFER YOUR CODE,
        </h1>
        <h1 className="text-green-800 md:text-5xl px-4 py-2 text-nowrap font-serif text-3xl flex-nowrap shadow-md">
          REFER THE FUTURE
        </h1>
      </div>
      <div className="max-w-7xl mx-auto py-10 flex justify-between items-center flex-col gap-5 md:flex-row px-1">
        <img
          src="https://i.ibb.co/6NkfcvX/Animated-Female-Characters-Under-Stylized-Sun-1.jpg"
          alt="Animated-Female-Characters-Under-Stylized-Sun-1"
          className="rounded-3xl md:max-h-[50vh] shadow-2xl max-h-[40vh]"
        />
        <div className="md:max-w-[40vw] lg:max-w[30vw]">
          <h1 className="text-5xl font-extrabold px-4 font-serif">Welcome to <span className="text-6xl text-[#24390c]">refi</span>!</h1>
          <p className="py-7 px-4">
            Join our growing community where connections create opportunities.
            When you refer a friend, you're not just sharing a platform - you're
            shaping the future of networking. Every referral builds our
            ecosystem stronger, rewards both you and your friend, and helps us
            create a more connected world. Together, we grow better.
          </p>
          <div className="flex flex-row">
            <Link to="/signup">
              <button className="transition-all duration-300 rounded-lg text-lg bg-[#24390c] 
              text-white
              font-medium py-2 tracking-tighter px-4 mx-4 hover:bg-[#5c753b]">
                SIGN UP NOW
              </button>
            </Link>
            <Link to="/signin">
              <button className="transition-all duration-300 rounded-lg text-lg
              font-medium py-2 tracking-tighter px-3 mx-4 hover:bg-[#5c753b] hover:text-white outline">
                SIGN IN
              </button>
            </Link>
            <Link to="/signup" className="py-1 hover:translate-x-2 cursor-pointer">
            <HiOutlineArrowNarrowRight className="text-4xl"/>
            </Link>
            
          </div>
        </div>
        <div></div>
      </div>
      <p className="text-center">
        Check top referrers{" "}
        <Link to="/leaderboard">
        <span className="text-green-900 underline">here</span>
        </Link>
      </p>
    </>
  );
}

export default Hero;
