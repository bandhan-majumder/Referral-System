import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-l from-green-700 to-transparent h-[100vh]" style={{boxSizing: "border-box"}}>
        <NavBar />
        <Hero />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
