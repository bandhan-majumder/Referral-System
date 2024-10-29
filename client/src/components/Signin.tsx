import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  id?: string;
  success: boolean;
  username?: string;
  message: string;
  referralCode?: string
}

function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  async function handleSubmit() {
    if (!formData.username || !formData.password) {
      setErrorMsg("Invalid username or password");
    } else {
      try {
        const response: ServerResponse = await axios.post(
          "/api/users/signin",
          formData
        );
        console.log(response);
        if (response.data.username) {
          alert(`Welcome back ${response.data.username}`);
          navigate("/dashboard");
        } else {
          setErrorMsg(response.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
          setErrorMsg(
            error.response?.data?.message || "An error occurred during signup"
          );
        }
      }
    }
  }

  return (
    <div className="max-w-xl h-auto mx-auto py-8 flex flex-col justify-center items-center my-20 gap-10 outline rounded-3xl">
      <h1 className="text-4xl underline underline-offset-4">
        Sign in to your account
      </h1>
      <div>
        <h2 className="text-2xl py-4">Enter your username</h2>
        <input
          id="username"
          onChange={handleChange}
          type="text"
          placeholder=" r a n d o m 1"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
          "
        />
        <h2 className="text-2xl py-4">Enter your password</h2>
        <input
          id="password"
          onChange={handleChange}
          type="password"
          placeholder=" * * * * * * * "
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-600
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="pt-5 text-lg">
          didn't have an account?{" "}
          <span className="underline underline-offset-2 text-green-900 hover:text-white cursor-pointer">
            <Link to="/signup">sign up</Link>
          </span>
        </p>
        {errorMsg ? (
          <p className="py-3 text-red-600 text-start">Error: {errorMsg}</p>
        ) : (
          <p className="py-3 text-slate-400 text-start">
            Tip: Follow the rules written in placeholders
          </p>
        )}
        <div className="flex justify-center items-center">
          <button
            className="bg-gradient-to-b from-black to-70% to-green-400 w-40 h-10 rounded-3xl text-lg hover:text-white"
            onClick={handleSubmit}
          >
            sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
