import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import UserDetails from "./components/UserDetails";
import LeaderBoard from "./components/LeaderBoard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-l from-green-700 to-100% to-transparent h-[100vh]">
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user/details" element={<UserDetails />}/>
          <Route path="/leaderboard" element={<LeaderBoard />} />
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
