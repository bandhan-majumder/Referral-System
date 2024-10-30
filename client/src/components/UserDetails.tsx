import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ProfileAtom } from "@/store/atoms/ProfileAtom";


interface responseType {
  data: ResponseData;
}

interface ResponseData {
  success: boolean;
  message: string;
  username: string;
  referralCount?: string;
  referralCode?: string;
}

interface UserMessage {
  username?: string;
  referralCode?: string;
  referralCount?: string;
}

function UserDetails() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<UserMessage>({});
  const value = useRecoilValue(ProfileAtom);
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try{
      const response: responseType = await axios.post("/api/users/showDetails");
    if (!response.data.success) {
      alert("You are not logged in");
      navigate("/signup");
    } else {
      // only if the user is logged in
      setMessage({
        username: response.data.username,
        referralCount: response.data.referralCount,
        referralCode: response.data.referralCode,
      });
    }
    } catch(error){
      alert("You are not logged in");
      navigate("/signup");
      console.log(error)
    }
    
  }

  return (
    <div>
      {message.referralCode ? (
        <div className="py-5 flex flex-col gap-10">
          <div className="text-center py-20">
            <h1 className="text-3xl pb-5 ">Welcome <span className="text-[#24390C] font-extrabold lowercase">{message.username} 🎉</span></h1>
            <h1>
              Your code is{" "}
              <span className="font-extrabold text-4xl">
                {message.referralCode}
              </span>
            </h1>
            <h1>
              this referral code is used by{" "}
              <span className="font-extrabold text-4xl">
                {message.referralCount}
              </span>{" "}
              people
            </h1>
            <h1 className="py-6 md:py-20 md:mb-80 mb-40">
              Check top 5 referral codes at{" "}
              <Link
                to="/leaderboard"
                className="underline underline-offset-2 cursor-pointer hover:text-[#3c492b]"
              >
                leaderboard
              </Link>
            </h1>
          </div>
        </div>
      ) : (
<h1 className="text-center 
        py-10 text-4xl font-semibold">{value ? "loading..":"log in first"}</h1>
      )}
    </div>
  );
}

export default UserDetails;