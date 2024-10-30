import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios";
import { ProfileAtom } from "@/store/atoms/ProfileAtom";

function NavBar() {
  const loggedIn = useRecoilValue(ProfileAtom);
  const [isHovered, setIsHovered] = useState(false);
  const setLoggedIn = useSetRecoilState(ProfileAtom);

  const navigate = useNavigate();

  async function logoutUser() {
    const response = await axios.post("/api/users/logout");
    if (response.data.success) {
      // change the state
      setLoggedIn(false);
      alert("You are logged out");
      navigate("/");
    }
  }

  return (
    <nav className="max-w-7xl mx-auto py-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-2xl font-extrabold tracking-tighter text-[#24390c] ml-2">
          refi
        </h1>
      </Link>
      <div className="flex gap-6">
        <Link
          to="/"
          className="flex text-center items-center justify-center text-lg hover:underline decoration-2"
        >
          Home
        </Link>
        <Link
          to="/leaderboard"
          className="flex text-center items-center justify-center text-lg hover:underline decoration-2"
        >
          Leaderboard
        </Link>
        {loggedIn ? (
          <div
            className="relative w-3px mr-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src="https://i.ibb.co/NWzjTVB/Animated-Female-Characters-Under-Stylized-Sun-1.jpg"
              alt="Animated Female Characters Under Stylized Sun"
              className="w-12 rounded-full h-12 cursor-pointer"
            />

            {/* Dropdown menu */}
            {isHovered && (
              <ul className="text-red-600 font-semibold absolute py-5 cursor-pointer">
                <li onClick={logoutUser}>Logout</li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/signup">
            <button className="transition-all duration-300 rounded-lg text-lg bg-gradient-to-b from-[#344027] to-70% to-[#5c753b] text-white font-medium px-5 py-2 tracking-tighter hover:bg-[#d0ddb9] mr-1">
              JOIN NOW
            </button>
          </Link>
        )}

        {/* <MdDarkMode className="text-3xl px-1 py-1"/> */}
      </div>
    </nav>
  );
}

export default NavBar;
