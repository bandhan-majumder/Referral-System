import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function Hero() {
  return (
    <>
      <div className="max-w-7xl mx-auto py-20 flex justify-between items-center">
        <img
          src="https://i.ibb.co/6NkfcvX/Animated-Female-Characters-Under-Stylized-Sun-1.jpg"
          alt="Animated-Female-Characters-Under-Stylized-Sun-1"
          className="rounded-3xl md:max-h-[50vh] bg-yellow-200"
        />
        <div className="md:max-w-[40vw] lg:max-w[30vw]">
          <h1 className="text-green-800 text-4xl px-4 text-nowrap">
            REFER YOUR FRIEND,
          </h1>
          <h1 className="text-green-600 text-4xl px-4 text-nowrap">
            REFER THE FUTURE
          </h1>
          <p className="py-7 px-4">
            Join our growing community where connections create opportunities.
            When you refer a friend, you're not just sharing a platform - you're
            shaping the future of networking. Every referral builds our
            ecosystem stronger, rewards both you and your friend, and helps us
            create a more connected world. Together, we grow better.
          </p>
          <div className="flex flex-row">
          <button className="transition-all duration-300 rounded-lg text-lg bg-green-500 font-medium py-2 tracking-tighter px-4 mx-4 hover:bg-green-600 outline">
            SIGN UP NOW
          </button>
          <button className="transition-all duration-300 rounded-lg text-lg bg-yellow-10 font-medium py-2 tracking-tighter px-3 mx-4 hover:bg-slate-300 outline">
            SIGN IN
          </button>
          <HiOutlineArrowNarrowRight className="text-4xl"/>
          </div>
        </div>
        <div>
        </div>
      </div>
      <p className="text-center">Know more about us <span className="text-green-900 underline">here</span></p>
    </>
  );
}

export default Hero;
