import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ProfileAtom } from "@/store/atoms/ProfileAtom";

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  id?: string;
  success: boolean;
  username?: string;
  message: string;
  referralCode?: string;
}

function Signin() {
  const setProfileState = useSetRecoilState(ProfileAtom);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
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
        if (response.data.username) {
          // set user as logged in
          setProfileState(true);
          alert(`Welcome back ${response.data.username}`);
          navigate("/user/details");
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

  return (
    <>
      <div className="max-w-xl mx-auto flex flex-col justify-center items-center my-20">
        <h1 className="text-4xl underline underline-offset-4 font-semibold py-10">
          Sign in to your account
        </h1>
        <div className="flex flex-col gap-0">
          <h2 className="text-2xl py-4">Enter your username</h2>
          <input
            id="username"
            onChange={handleChange}
            type="text"
            placeholder=" r a n d o m 1"
            className="flex h-9 w-full rounded-md border border-black bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50
          "
          />
          <h2 className="text-2xl py-4">Enter your password</h2>
          <input
            id="password"
            onChange={handleChange}
            type="password"
            placeholder=" * * * * * * * "
            className="flex h-9 w-full rounded-md border border-black bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="pt-5 text-lg">
            didn't have an account?{" "}
            <span className="underline underline-offset-2 text-green-900 font-semibold hover:text-[#95af6c] cursor-pointer">
              <Link to="/signup">sign up</Link>
            </span>
          </p>
        </div>
        <div>
          {errorMsg ? (
            <p className="font-semibold py-2 text-red-700 text-start">
              <span>Error:</span> {errorMsg}
            </p>
          ) : (
            <p className="py-2 text-slate-800 text-start">
              <span className="font-semibold">Tip:</span> Follow the rules
              written in placeholders
            </p>
          )}
          <div className="flex justify-center items-center">
            <button
              className="bg-gradient-to-b from-[#344027] to-70% to-[#5c753b] text-white w-40 h-10 rounded-3xl text-lg hover:from-[#9fb99c] hover:to-[#283d29] hover:text-white"
              onClick={handleSubmit}
            >
              sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
