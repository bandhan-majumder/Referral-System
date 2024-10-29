import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="max-w-7xl mx-auto py-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-2xl font-extrabold tracking-tighter text-[#24390c] ml-2">
          refi
        </h1>
      </Link>
      <div className="flex gap-10">
        <Link to="/leaderboard" className="flex text-center items-center justify-center text-lg hover:underline decoration-2">
        Leaderboard
        </Link>
        <Link to="/signup">
        <button className="transition-all duration-300 rounded-lg text-lg bg-gradient-to-b from-[#344027] to-70% to-[#5c753b] text-white font-medium px-5 py-2 tracking-tighter hover:bg-[#d0ddb9] mr-1">JOIN NOW</button></Link>
        
        {/* <MdDarkMode className="text-3xl px-1 py-1"/> */}
      </div>
    </nav>
  );
}

export default NavBar;
