import { Link } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";

function NavBar() {
  return (
    <nav className="max-w-7xl mx-auto py-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-2xl font-extrabold tracking-tighter text-green-500">
          refi
        </h1>
      </Link>
      <div className="flex gap-10">
        <Link to="/leaderboard" className="flex text-center items-center justify-center text-lg hover:underline decoration-2">
        Leaderboard
        </Link>
        <button className="transition-all duration-300 rounded-lg text-lg bg-green-500 font-medium px-5 py-2 tracking-tighter hover:bg-green-700 outline">JOIN NOW</button>
        <MdDarkMode className="text-3xl px-1 py-1"/>
      </div>
    </nav>
  );
}

export default NavBar;
