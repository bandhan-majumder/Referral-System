import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  id?: string;
  referralCode?: string;
  success: boolean;
  username?: string;
  message: string;
}

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    referralCode: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("")
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  async function handleSubmit() {
    if (!formData.username || !formData.password) {
      setErrorMsg("username and password can't be empty");
    } else {
        if (formData.username.length < 5 || formData.username.length > 10) {
            setErrorMsg("Username must be within 5 to 10 characters");
        } else {
            try {
                const response: ServerResponse = await axios.post(
                  "/api/users/signup",
                  formData
                );
                if (response.data.success) {
                  alert(`Your REFERRAL code is ${response.data.referralCode}, sign in to see dashboard`);
                  navigate("/signin")
                } else {
                  setErrorMsg(response.data.message);
                }
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  setErrorMsg(
                    error.response?.data?.message || "An error occurred during signup"
                  );
                }
              }
        }
      
    }
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col justify-center items-center my-20">
      <h1 className="text-4xl underline underline-offset-4 font-semibold py-10">
        Create an account
      </h1>
      <div className="flex flex-col gap-0">
        <h2 className="text-2xl py-2">Enter your username</h2>
        <input
          id="username"
          onChange={handleChange}
          type="text"
          minLength={5}
          maxLength={10}
          placeholder="enter 5 to 10 char username"
          className="flex h-9 w-full rounded-md border border-black bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lowercase
          "
        />
        <h2 className="text-2xl py-2">Enter your password</h2>
        <input
          id="password"
          onChange={handleChange}
          type="password"
          placeholder=" * * * * * * * "
          className="flex h-9 w-full rounded-md border border-black bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <h2 className="text-2xl py-2"> REFERRAL code (optional)</h2>
        <input
          id="referralCode"
          onChange={handleChange}
          minLength={6}
          maxLength={6}
          type="text"
          placeholder="Enter 6 digit code"
          className="flex h-9 w-full rounded-md border border-black bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 uppercase"
        />
        <p className="pt-5 text-lg">
          already have an account?{" "}
          <span className="underline underline-offset-2 text-green-900 font-semibold hover:text-[#95af6c] cursor-pointer">
            <Link to="/signin">sign in</Link>
          </span>
        </p>
      </div>
        {errorMsg ? (
          <p className="font-semibold py-2 text-red-700"><span className="text-start">Error:</span> {errorMsg}</p>
        ): (
            <p className="py-2 text-slate-800 text-start"><span className="font-semibold">Tip:</span> Follow the rules written in placeholders</p>
        )}
        <div className="flex justify-center items-center">
          <button
            className="bg-gradient-to-b from-[#344027] to-70% to-[#5c753b] text-white w-40 h-10 rounded-3xl text-lg hover:from-[#9fb99c] hover:to-[#283d29] hover:text-white"
            onClick={handleSubmit}
          >
            sign up
          </button>
        </div>
      </div>
  );
}

export default Signup;
