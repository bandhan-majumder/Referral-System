import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface responseType {
  data: ResponseData;
}

interface ResponseData {
  success: boolean;
  message: string;
  referralCount?: string;
  referralCode?: string;
}

interface UserMessage {
  referralCode?: string;
  referralCount?: string;
}

function UserDetails() {
  const [message, setMessage] = useState<UserMessage>({});
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response: responseType = await axios.post("/api/users/showDetails");
    setMessage({
      ...message,
      referralCount: response.data.referralCount,
      referralCode: response.data.referralCode,
    });
  }

  return (
    <div>
      {message.referralCode ? (
        <div className="py-5 flex flex-col gap-10">
          <div className="text-center py-20">
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
          <h1 className="py-6 md:py-20 md:mb-80 mb-40">Check top 5 referral codes at <Link to="/leaderboard" className="underline underline-offset-2 cursor-pointer hover:text-[#3c492b]">
        leaderboard</Link></h1>
          </div>
        </div>
      ) : (
        <h1 className="text-center py-10">loading...</h1>
      )}
    </div>
  );
}

export default UserDetails;
